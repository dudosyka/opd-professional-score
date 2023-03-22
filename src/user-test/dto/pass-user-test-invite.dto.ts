import { IsJSON, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PassUserTestInviteDto {
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

  @IsJSON({
    message: 'result must be valid JSON',
  })
  @ApiProperty({
    type: String,
    description: 'Test result',
  })
  result: string;
}
