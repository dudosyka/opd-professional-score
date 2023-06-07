import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { BcryptUtil } from '../utils/bcrypt.util';
import { JwtUtil } from '../utils/jwt.util';
import { ModelNotFoundException } from '../exceptions/model-not-found.exception';
import { Op } from 'sequelize';
import { OutputUserRateProfileDto } from './dto/output-user-rate-profile.dto';
import { UserTestService } from '../user-test/user-test.service';
import { TestService } from '../test/test.service';
import { PvkEntity } from '../pvk/entities/pvk.entity';
import { EvaluationCriteriaEntity } from '../pvk/entities/evaluation.criteria.entity';
import { ParamEntity } from '../param/entities/param.entity';
import { TestEntity } from '../test/entities/test.entity';
import { AnswerDto, MlInputDto } from './dto/ml-input.dto';
import axios from 'axios';
import { EvaluationCriteriaParamsEntity } from '../pvk/entities/evaluation.criteria.params.entity';
import { PvkEvaluationCriteriaEntity } from '../pvk/entities/pvk.evaluation.criteria.entity';
import { PvkService } from '../pvk/pvk.service';
import { ProfessionEntity } from '../profession/entities/profession.entity';
import { ProfessionPvkEntity } from '../profession/entities/profession.pvk.entity';

@Injectable()
export class UserService {
  constructor(
    private userTestService: UserTestService,
    private testService: TestService,
    private pvkService: PvkService,
    @Inject(BcryptUtil) private bcryptUtil: BcryptUtil,
    @Inject(JwtUtil) private jwtUtil: JwtUtil,
  ) {}

  async checkDoubleRecord(_arguments: Record<string, any>) {
    const checkExists = await UserEntity.findOne({
      where: {
        ..._arguments,
      },
    });

    if (checkExists)
      throw new HttpException('Double record', HttpStatus.CONFLICT);
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password, ...user } = createUserDto;
    const hash = await this.bcryptUtil.hash(password);

    await this.checkDoubleRecord({ login: createUserDto.login });

    return await UserEntity.create({
      ...user,
      hash,
      role: 1,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await UserEntity.findAll({
      attributes: ['id', 'name', 'login', 'role'],
      where: {
        role: 1,
      },
    });
  }

  async findAllResp(): Promise<UserEntity[]> {
    return await UserEntity.findAll({
      attributes: ['id', 'name', 'login', 'role'],
      where: {
        //On Id 1 we put all invite passes
        [Op.not]: {
          id: 1,
        },
        role: 0,
      },
    });
  }

  async findOne(id: number, role = [1]): Promise<UserEntity> {
    const model = await UserEntity.findOne({
      attributes: ['id', 'name', 'login', 'role'],
      where: {
        id,
      },
    });

    if (!model) throw new ModelNotFoundException(UserEntity, id);

    return model;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const model = await this.findOne(id);

    const { password, ...data } = updateUserDto;

    if (updateUserDto.login && model.login != updateUserDto.login)
      await this.checkDoubleRecord({ login: updateUserDto.login });

    const hash = await this.bcryptUtil.hash(password);

    await model.update({
      ...data,
      hash,
    });

    return model;
  }

  async remove(id: number) {
    const model = await this.findOne(id);

    await model.destroy();

    return true;
  }

  async validate(login: string, password: string) {
    const model = await UserEntity.findOne({
      where: {
        login,
      },
    });

    if (!model) return null;

    const hash = model.hash;

    if (await this.bcryptUtil.compare(password, hash)) {
      return model;
    } else {
      return null;
    }
  }

  auth(user: UserEntity) {
    return this.jwtUtil.sign(user);
  }

  hashStr(str: string) {
    return Promise.resolve(this.bcryptUtil.hash(str));
  }

  async createSimpleUser(userDto: CreateUserDto) {
    const { password, ...user } = userDto;
    const hash = await this.bcryptUtil.hash(password);

    await this.checkDoubleRecord({ login: user.login });

    return await UserEntity.create({
      ...user,
      hash,
      role: 0,
    });
  }

  async rate(
    userId: number,
    answer: AnswerDto[],
  ): Promise<OutputUserRateProfileDto> {
    const userParamsAverage = {};

    const tests = await this.testService.getAllWithParams();
    await Promise.all(
      tests.map(async (el) => {
        const results = await this.userTestService.getResults({
          test_id: el.id,
          user_id: userId,
        });

        if (results.length <= 0) {
          throw new Error('Not enough results');
        }

        console.log(`Test_id: ${el.id}: `, results);

        el.params.map((param, index) => {
          userParamsAverage[parseInt(param.id.toString())] = {
            average: Math.round(
              results
                .map((res) =>
                  res[param.key]
                    ? res[param.key]
                    : res['additional'][param.key],
                )
                .reduce((a, b) => a + b) / results.length,
            ),
            direction: param.direction,
            slice: param.slice,
            test_id: el.id,
          };
        });
      }),
    ).catch((err) => {
      throw err;
    });

    console.log('USER PARAM AVERAGE', userParamsAverage);

    const pvk = await PvkEntity.findAll({
      where: {
        ...(answer.length
          ? {
              id: {
                [Op.in]: answer.map((el) => el.pvkId),
              },
            }
          : {}),
      },
      include: [
        {
          model: EvaluationCriteriaEntity,
          include: [{ model: ParamEntity, include: [TestEntity] }],
        },
      ],
    });

    const mlInput = [];
    const j = 0;
    pvk.forEach((el) => {
      const mlInputItem = {
        pvkId: el.id,
        input: [],
        hiddenMatrix: [],
        outputMatrix: [],
        calculationLayers: [],
        answer: [1],
        learnEpoch: 1,
      };
      const input = Object.keys(userParamsAverage)
        .sort()
        .map((key) => {
          const param = userParamsAverage[key];
          let a = 1;
          if (param.direction == 1) {
            if (param.average > param.slice) {
              return 0;
            }
            a = 0;
          } else {
            if (param.average < param.slice) {
              return 0;
            }
          }
          return Math.abs(a - param.average / param.slice);
        });

      const hiddenMatrix = [];
      const outputMatrix = [];
      outputMatrix.push([]);
      let i = 0;
      let j = 0;
      el.criteria.forEach((criteria) => {
        hiddenMatrix.push([]);
        criteria.params.forEach((param) => {
          hiddenMatrix[i].push({
            criteriaId: criteria.id,
            paramId: param.id,
            weight: param.dataValues.EvaluationCriteriaParamsEntity.weight,
          });
        });
        outputMatrix[j].push({
          criteriaId: criteria.id,
          weight: criteria.dataValues.PvkEvaluationCriteriaEntity.weight,
        });
        i++;
      });
      mlInputItem.hiddenMatrix = hiddenMatrix;
      mlInputItem.outputMatrix = outputMatrix;
      mlInputItem.input = input;
      if (hiddenMatrix.length > 0) mlInput.push(mlInputItem);
      j++;
    });

    const data: MlInputDto[] = mlInput.map((el) => {
      console.log('Input: ', el.input);
      el.hiddenMatrix = el.hiddenMatrix.map((item) =>
        item.sort((a, b) => a.paramId - b.paramId),
      );
      console.log(
        'Hidden matrix: ',
        el.hiddenMatrix.map((m) => m),
      );
      console.log(
        'Output matrix: ',
        el.outputMatrix.map((m) => m),
      );
      return {
        input: el.input,
        hiddenMatrix: el.hiddenMatrix.map((m) => m.map((k) => k.weight)),
        outputMatrix: el.outputMatrix.map((m) => m.map((k) => k.weight)),
        calculationLayers: [],
        learnEpoch: answer.length > 0 ? 20 : 0,
        answer: answer.map((el) => el.value),
      };
    });

    const output: OutputUserRateProfileDto = { pvk: [], prof: [] };
    console.log(JSON.stringify({ input: data }));
    return await axios
      .post(
        'http://localhost:8082/',
        { input: data },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(async (el) => {
        const i = 0;
        console.log(el.data);
        el.data.forEach((el) => {
          const item = mlInput[i];
          if (!el.hiddenMatrix) {
            output.pvk.push({
              pvk: this.pvkService.modelOutputProcessor(pvk[i]),
              value: el.pvk[0],
            });
            return;
          }
          item.hiddenMatrix.forEach((row, indexR) => {
            row.forEach((col, indexC) => {
              EvaluationCriteriaParamsEntity.update(
                {
                  weight: el.hiddenMatrix[indexR][indexC],
                },
                {
                  where: {
                    param_id: col.paramId,
                    criteria_id: col.criteriaId,
                  },
                },
              );
            });
          });

          item.outputMatrix.forEach((row, indexR) => {
            row.forEach((col, indexC) => {
              PvkEvaluationCriteriaEntity.update(
                {
                  weight: el.outputMatrix[indexR][indexC],
                },
                {
                  where: {
                    criteria_id: col.criteriaId,
                  },
                },
              );
            });
          });

          console.log(el);
          console.log(el.pvk[0]);
          output.pvk.push({
            pvk: this.pvkService.modelOutputProcessor(pvk[i]),
            value: el.pvk[0],
          });
        });

        const professions = await ProfessionEntity.findAll({
          include: [PvkEntity],
        });

        const personPvk = {};
        output.pvk.forEach((el) => (personPvk[el.pvk.id] = el.value));
        const profAvailable = [];
        professions.forEach((prof) => {
          let isAvailable = 0;
          prof.pvk.forEach((pvk) => {
            if (Object.keys(personPvk).includes(String(pvk.id))) {
              isAvailable +=
                pvk.dataValues.ProfessionPvkEntity.weight * personPvk[pvk.id];
            }
          });
          isAvailable /= prof.pvk.length;
          if (isAvailable >= 0.05) {
            profAvailable.push({
              prof: {
                name: prof.name,
                id: prof.id,
              },
              value: isAvailable * 100,
            });
          }
        });

        output.prof = profAvailable;

        return output;
      });
  }
}
