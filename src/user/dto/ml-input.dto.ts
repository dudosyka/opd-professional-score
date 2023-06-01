import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class MlInputDto {
  input: number[];
  hiddenMatrix: number[][];
  outputMatrix: number[][];
  answer: number[] = [];
  learnEpoch = 0;
}

export class AnswerDto {
  pvkId: number;
  value: number;
}

export class RateProfileAnswer {
  @ValidateNested({
    each: true,
  })
  @Type(() => AnswerDto)
  @ApiProperty({
    type: AnswerDto,
    isArray: true,
    description: 'PVK values',
  })
  answer: AnswerDto[];
}
