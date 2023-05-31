import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class MlInputDto {
  input: number[];
  hiddenMatrix: number[][];
  outputMatrix: number[][];
  answer: number[] = [];
  learnEpoch = 0;
}

export class RateProfileAnswer {
  @IsNumber(
    {},
    {
      each: true,
    },
  )
  @ApiProperty({
    type: Number,
    isArray: true,
    description: 'PVK values',
  })
  answer: number[];
}
