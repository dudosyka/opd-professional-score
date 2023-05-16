import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePvkProfDto {
  @IsNumber(
    {},
    {
      message: 'pvk_id must be numeric array',
      each: true,
    },
  )
  @ApiProperty({
    type: Number,
    description: 'pvk entity ids',
  })
  pvk_ids: number[];
}
