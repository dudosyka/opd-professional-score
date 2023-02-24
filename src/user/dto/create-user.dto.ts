import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'login must be string',
  })
  login: string;

  @IsString({
    message: 'password must be string',
  })
  password: string;
}
