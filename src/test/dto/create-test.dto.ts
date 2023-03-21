import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestDto {
  @IsString({
    message: 'name must be string',
  })
  @ApiProperty({
    type: String,
    description: 'Test name',
  })
  name: string;

  @IsString({
    message: 'description must be string',
  })
  @ApiProperty({
    type: String,
    description: 'Test description',
  })
  description: string;
}
