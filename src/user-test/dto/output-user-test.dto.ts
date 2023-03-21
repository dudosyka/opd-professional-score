import { ApiProperty } from '@nestjs/swagger';

export class OutputUserTestDto {
  @ApiProperty({
    type: Number,
    description: 'UserTestEntity id',
  })
  id: number;

  @ApiProperty({
    type: Number,
    description: 'UserEntity id',
  })
  user_id: number;

  @ApiProperty({
    type: Number,
    description: 'TestEntity id',
  })
  test_id: number;

  @ApiProperty({
    type: String,
    description: 'Test pass data',
  })
  result: string;
}
