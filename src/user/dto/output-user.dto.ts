import { ApiProperty } from '@nestjs/swagger';

export class OutputUserDto {
  @ApiProperty({
    type: Number,
    description: 'User id',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'User login',
  })
  login?: string;

  @ApiProperty({
    type: String,
    description: 'User name',
  })
  name: string;

  @ApiProperty({
    type: Number,
    description: 'User role',
  })
  role?: number;
}
