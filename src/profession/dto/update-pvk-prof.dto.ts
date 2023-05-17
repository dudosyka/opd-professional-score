import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PvkProfDto {
  @IsNumber(
    {},
    {
      message: 'pvk_id must be numeric',
      each: true,
    },
  )
  @ApiProperty({
    type: Number,
    description: 'pvk entity id',
  })
  pvk_id: number;

  @IsNumber(
    {},
    {
      message: 'weight must be numeric',
      each: true,
    },
  )
  @ApiProperty({
    type: Number,
    description: 'pvk criteria weight',
  })
  weight: number;
}

export class UpdatePvkProfDto {
  @IsNumber(
    {},
    {
      message: 'pvk must be array of PvkProfDto',
      each: true,
    },
  )
  @ApiProperty({
    type: PvkProfDto,
    isArray: true,
    description: 'pvk entity ids',
  })
  pvk: PvkProfDto[];
}
