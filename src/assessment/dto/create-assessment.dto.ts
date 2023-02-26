import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PvkAssessmentDto } from './pvk-assessment.dto';

export class CreateAssessmentDto {
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
