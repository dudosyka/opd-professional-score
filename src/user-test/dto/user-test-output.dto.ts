import { ApiProperty } from '@nestjs/swagger';

//One of the results with details (points)
export class UserTestOutputDto {
  @ApiProperty({
    type: Number,
    description: 'UserTest id',
  })
  id: number;

  @ApiProperty({
    type: Number,
    description: 'Average value of UserTest',
  })
  avg: number;

  @ApiProperty({
    type: Number,
    description: 'Points value of UserTest',
  })
  points: number[];
}
