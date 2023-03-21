import { PartialType } from '@nestjs/swagger';
import { CreateUserTestAvailableDto } from './create-user-test-available.dto';

export class UpdateUserTestAvailableDto extends PartialType(
  CreateUserTestAvailableDto,
) {}
