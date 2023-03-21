import { UserTestAvailableDto } from './user-test-available.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserTestAvailableDto {
  @ValidateNested({
    each: true,
  })
  @Type(() => UserTestAvailableDto)
  @ApiProperty({
    type: UserTestAvailableDto,
    description: 'UserTestAvailableDto',
  })
  tests: UserTestAvailableDto[];
}
