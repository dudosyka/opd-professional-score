import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AssessmentPvkList {
  @IsNumber(
    {},
    {
      message: 'pvk_id must be numeric',
    },
  )
  pvk_id: number;

  @IsNumber(
    {},
    {
      message: 'grade is must be numeric',
    },
  )
  grade: number;
}

export class CreateAssessmentDto {
  @IsNumber(
    {},
    {
      message: 'user_id must be numeric',
    },
  )
  user_id: number;

  @IsNumber(
    {},
    {
      message: 'profession_id must be numeric',
    },
  )
  profession_id: number;

  @ValidateNested({
    message: 'pvk must be array',
    each: true,
  })
  @Type(() => AssessmentPvkList)
  pvk: AssessmentPvkList[];
}
