import { PartialType } from '@nestjs/swagger';
import { PassUserTestDto } from './pass-user-test.dto';

export class UpdateUserTestDto extends PartialType(PassUserTestDto) {}
