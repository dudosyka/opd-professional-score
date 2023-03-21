import { IsJSON, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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

  @IsJSON({
    message: 'result must be valid JSON',
  })
  @ApiProperty({
    type: String,
    description: 'Test result',
  })
  result: string;
}
