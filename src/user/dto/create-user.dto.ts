import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString({
    message: 'name must be string',
  })
  @ApiProperty({
    type: String,
    description: 'User name',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'User login',
  })
  @IsEmail(
    {},
    {
      message: 'login must be correct',
    },
  )
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
