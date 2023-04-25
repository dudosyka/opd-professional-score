import { IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UserTestResultDto {
  @IsNumber(
    {},
    {
      message: 'points must be array of INT',
      each: true,
    },
  )
  points: number[];

  @IsNumber(
    {},
    {
      message: 'avg must be number',
    },
  )
  avg: number;
}

export class PassUserTestDto {
  @IsNumber(
    {},
    {
      message: 'user_available_test must be number',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'UserTestAvailableEntity id',
  })
  user_available_test: number;

  @ApiProperty({
    type: String,
    description: 'Test result',
  })
  @ValidateNested()
  @Type(() => UserTestResultDto)
  result: UserTestResultDto;
}
