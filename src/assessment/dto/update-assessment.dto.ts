import { IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PvkAssessmentDto } from './pvk-assessment.dto';

export class UpdateAssessmentDto {
  user_id: number;
  @IsNumber(
    {},
    {
      message: 'profession_id must be numeric',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'assessed profession entity id',
  })
  profession_id: number;

  @ValidateNested({
    message: 'pvk must be array',
    each: true,
  })
  @ApiProperty({
    isArray: true,
    type: PvkAssessmentDto,
    description: 'PVK list',
  })
  @Type(() => PvkAssessmentDto)
  pvk: PvkAssessmentDto[];
}
