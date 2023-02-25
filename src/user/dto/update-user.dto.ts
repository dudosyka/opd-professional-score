import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString({
    message: 'name must be string',
  })
  @ApiProperty({
    type: String,
    description: 'User name',
  })
  name: string;

  @IsString({
    message: 'login must be string',
  })
  @ApiProperty({
    type: String,
    description: 'User login',
  })
  login: string;

  @IsString({
    message: 'password must be string',
  })
  @ApiProperty({
    type: String,
    description: 'User password',
  })
  password: string;
}
