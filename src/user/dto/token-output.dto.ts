import { ApiProperty } from '@nestjs/swagger';

export default class TokenOutputDto {
  @ApiProperty({
    type: String,
    description: 'Bearer token',
  })
  token: string;
}
