import { ApiProperty } from '@nestjs/swagger';
import { PvkAssessmentDto } from './pvk-assessment.dto';

class AssessmentDto {
  @ApiProperty({
    type: Number,
    description: 'Assessment entity id',
  })
  id: number;

  @ApiProperty({
    type: Number,
    description: 'Expert entity id',
  })
  user_id: number;

  @ApiProperty({
    type: Number,
    description: 'Profession entity id',
  })
  profession_id: number;
}

export class OutputAssessmentDto {
  @ApiProperty({
    type: AssessmentDto,
    description: 'Assessment entity',
  })
  assessment: AssessmentDto;

  @ApiProperty({
    type: PvkAssessmentDto,
    isArray: true,
    description: 'Profession entity id',
  })
  pvk: PvkAssessmentDto;
}
