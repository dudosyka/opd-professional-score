import { ApiProperty } from '@nestjs/swagger';

export class ErrorOutputDto {
  @ApiProperty({
    type: Number,
    description: 'log item entity ID',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'log item name',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'log item message',
  })
  message: string;

  @ApiProperty({
    type: String,
    isArray: true,
    description: 'log item stack trace',
  })
  stack: string[];

  @ApiProperty({
    type: String,
    description: 'log item timestamp',
  })
  timestamp: string;
}
