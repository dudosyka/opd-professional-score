import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { UserService } from '../user/user.service';
import { PvkService } from '../pvk/pvk.service';
import { ProfessionService } from '../profession/profession.service';
import { AssessmentEntity } from './entities/assessment.entity';
import { AssessmentPvkEntity } from './entities/assessment.pvk.entity';
import { PvkEntity } from '../pvk/entities/pvk.entity';

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
      throw new NotFoundException();

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

    return {
      assessment: assessmentModel,
      pvk: pvkListModels,
    };
  }

  async findAll() {
    const models = await AssessmentEntity.findAll({
      include: [PvkEntity],
    });

    return models.map((el) => {
      return {
        assessment: {
          id: el.id,
          user_id: el.id,
          profession_id: el.profession_id,
        },
        pvk: { pvk_id: el.pvk.id, grade: el.pvk['PvkEntity'].grade },
      };
    });
  }

  async findOne(id: number, needsModel = false) {
    const model = await AssessmentEntity.findOne({
      where: {
        id,
      },
      include: [PvkEntity],
    });

    if (!model) throw new NotFoundException();

    if (needsModel) return model;

    return {
      assessment: {
        id: model.id,
        user_id: model.id,
        profession_id: model.profession_id,
      },
      pvk: { pvk_id: model.pvk.id, grade: model.pvk['PvkEntity'].grade },
    };
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
      throw new NotFoundException();

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

    return {
      assessment: model,
      pvk: pvkListModels,
    };
  }

  async remove(id: number) {
    const model = await this.findOne(id, true);

    if (!(model instanceof AssessmentEntity)) return null;

    await model.destroy();

    return true;
  }
}
