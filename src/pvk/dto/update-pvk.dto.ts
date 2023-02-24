import { PartialType } from '@nestjs/mapped-types';
import { CreatePvkDto } from './create-pvk.dto';

export class UpdatePvkDto extends PartialType(CreatePvkDto) {}
