import { ApiProperty } from '@nestjs/swagger';

//One of the item of list of results without details (points)
export class UserTestListOutputDto {
  @ApiProperty({
    type: Number,
    description: 'UserTest id',
  })
  id: number;

  @ApiProperty({
    type: Number,
    description: 'Average value of UserTest',
  })
  avg: any;
}
