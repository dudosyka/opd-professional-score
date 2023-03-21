import { IsJSON, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserTestAvailableDto {
  @IsNumber(
    {},
    {
      message: 'user_id must be number',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'UserEntity id',
  })
  user_id: number;

  @IsNumber(
    {},
    {
      message: 'test_id must be number',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'TestEntity id',
  })
  test_id: number;

  @IsNumber(
    {},
    {
      message: 'relative_id must be number',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'Relative id',
  })
  relative_id: number;

  @IsJSON({
    message: 'settings must be valid JSON',
  })
  @ApiProperty({
    type: String,
    description: 'Test settings json object',
  })
  settings: string;
}
