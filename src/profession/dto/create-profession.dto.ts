import { IsString } from 'class-validator';

export class CreateProfessionDto {
  @IsString({
    message: 'name must be string',
  })
  name: string;

  @IsString({
    message: 'description must be string',
  })
  description: string;
}
