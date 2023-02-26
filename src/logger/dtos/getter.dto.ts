import { ApiProperty } from '@nestjs/swagger';

export class GetterDto {
  @ApiProperty({
    type: String,
    description: 'Secret pass to get info from logger',
  })
  passphrase: string;
}
