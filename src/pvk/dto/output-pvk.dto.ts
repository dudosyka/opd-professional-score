import { ApiProperty } from '@nestjs/swagger';

export default class OutputPvkDto {
  @ApiProperty({
    type: Number,
    description: 'PVK entity ID',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'PVK name',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'PVK description',
  })
  description: string;
}
