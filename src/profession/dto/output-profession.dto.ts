import { ApiProperty } from '@nestjs/swagger';
import OutputPvkDto from '../../pvk/dto/output-pvk.dto';

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

  @ApiProperty({
    isArray: true,
    type: OutputPvkDto,
    description: 'Pinned pvk',
  })
  pvk: OutputPvkDto[];
}
