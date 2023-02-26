import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfessionDto {
  @IsString({
    message: 'name must be string',
  })
  @ApiProperty({
    type: String,
    description: 'Profession name',
  })
  name: string;

  @IsString({
    message: 'description must be string',
  })
  @ApiProperty({
    type: String,
    description: 'Profession description',
  })
  description: string;

  author_id: number;
}
