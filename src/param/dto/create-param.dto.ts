import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParamDto {
  @IsString({
    message: 'name must be string',
  })
  @ApiProperty({
    type: String,
    description: 'Param name',
  })
  name: string;

  @IsString({
    message: 'description must be string',
  })
  @ApiProperty({
    type: String,
    description: 'Param description',
  })
  description: string;

  @IsString({
    message: 'key must be string',
  })
  @ApiProperty({
    type: String,
    description: 'Key of param in result json',
  })
  key: string;
}
