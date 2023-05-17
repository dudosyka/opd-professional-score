import { CreateCriteriaDto } from './create-criteria.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCriteriaDto extends PartialType(CreateCriteriaDto) {}
