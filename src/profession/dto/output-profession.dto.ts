import { ApiProperty } from '@nestjs/swagger';

export default class OutputProfessionDto {
  @ApiProperty({
    type: Number,
    description: 'Profession entity ID',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Profession name',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Profession description',
  })
  description: string;

  @ApiProperty({
    type: Number,
    description: 'Profession creator id',
  })
  author_id: number;
}
