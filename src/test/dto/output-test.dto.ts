import { ApiProperty } from '@nestjs/swagger';

export class OutputTestDto {
  @ApiProperty({
    type: String,
    description: 'TestEntity id',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Test name',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Test description',
  })
  description: string;
}
