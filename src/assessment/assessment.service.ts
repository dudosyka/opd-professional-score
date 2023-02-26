import { Inject, Injectable } from '@nestjs/common';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { UserService } from '../user/user.service';
import { PvkService } from '../pvk/pvk.service';
import { ProfessionService } from '../profession/profession.service';
import { AssessmentEntity } from './entities/assessment.entity';
import { AssessmentPvkEntity } from './entities/assessment.pvk.entity';
import { PvkEntity } from '../pvk/entities/pvk.entity';
import { ModelNotFoundException } from '../exceptions/model-not-found.exception';
import { OutputAssessmentDto } from './dto/output-assessment.dto';

@Injectable()
export class AssessmentService {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(PvkService) private pvkService: PvkService,
    @Inject(ProfessionService) private professionService: ProfessionService,
  ) {}
  async create(createAssessmentDto: CreateAssessmentDto) {
    const expertModel = await this.userService.findOne(
      createAssessmentDto.user_id,
    );
    const professionModel = await this.professionService.findOne(
      createAssessmentDto.profession_id,
    );
    const pvkModels = await this.pvkService.findAllByIds(
      createAssessmentDto.pvk.map((el) => el.pvk_id),
    );

    if (pvkModels.length < createAssessmentDto.pvk.length)
      throw new ModelNotFoundException(PvkEntity, null);

    const assessmentModel = await AssessmentEntity.create({
      profession_id: professionModel.id,
      user_id: expertModel.id,
    });

    const pvkListModels = await AssessmentPvkEntity.bulkCreate(
      createAssessmentDto.pvk.map((el) => {
        return {
          ...el,
          assessment_id: assessmentModel.id,
        };
      }),
    );

    return this.processUpdatedModelsToOutputDto(assessmentModel, pvkListModels);
  }

  private processUpdatedModelsToOutputDto(
    model: AssessmentEntity,
    pvkList: AssessmentPvkEntity[],
  ) {
    const { id, profession_id, user_id } = model;

    return {
      assessment: { id, profession_id, user_id },
      pvk: pvkList.map((el) => {
        return {
          pvk_id: el.pvk_id,
          grade: el.grade,
        };
      }),
    };
  }

  private processGotModelsToOutputDto(
    models: AssessmentEntity[],
  ): OutputAssessmentDto[] {
    return models.map((el) => {
      return {
        assessment: {
          id: el.id,
          user_id: el.id,
          profession_id: el.profession_id,
        },
        pvk: el.pvk.map((pvk) => ({
          pvk_id: pvk.id,
          grade: pvk['AssessmentPvkEntity'].grade,
        })),
      };
    });
  }

  async findAll() {
    const models = await AssessmentEntity.findAll({
      include: [PvkEntity],
    });

    return this.processGotModelsToOutputDto(models);
  }

  async findOne<T>(id: number, needsModel = false): Promise<T | any> {
    const model = await AssessmentEntity.findOne({
      where: {
        id,
      },
      include: [PvkEntity],
    });

    if (!model) throw new ModelNotFoundException(AssessmentEntity, id);

    if (needsModel) return model;

    return this.processGotModelsToOutputDto([model])[0];
  }

  async update(id: number, updateAssessmentDto: UpdateAssessmentDto) {
    const model = await this.findOne(id, true);
    const expertModel = await this.userService.findOne(
      updateAssessmentDto.user_id,
    );
    const professionModel = await this.professionService.findOne(
      updateAssessmentDto.profession_id,
    );
    const pvkModels = await this.pvkService.findAllByIds(
      updateAssessmentDto.pvk.map((el) => el.pvk_id),
    );

    if (pvkModels.length < updateAssessmentDto.pvk.length)
      throw new ModelNotFoundException(PvkEntity, null);

    if (!(model instanceof AssessmentEntity)) return null;

    await model.update({
      profession_id: professionModel.id,
      user_id: expertModel.id,
    });

    await AssessmentPvkEntity.destroy({
      where: {
        assessment_id: model.id,
      },
    });

    const pvkListModels = await AssessmentPvkEntity.bulkCreate(
      updateAssessmentDto.pvk.map((el) => {
        return {
          ...el,
          assessment_id: model.id,
        };
      }),
    );

    return this.processUpdatedModelsToOutputDto(model, pvkListModels);
  }

  async remove(id: number) {
    const model: AssessmentEntity = await this.findOne<AssessmentEntity>(
      id,
      true,
    );

    await AssessmentPvkEntity.destroy({
      where: {
        assessment_id: id,
      },
    });

    await model.destroy();

    return true;
  }
}
