import { IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateWeightedParam } from '../../param/dto/create-param.dto';

export class CreateCriteriaDto {
  @ApiProperty({
    type: String,
    description: 'Criteria name',
  })
  @IsString({
    message: 'name must be string',
  })
  name: string;

  @ApiProperty({
    isArray: true,
    type: CreateWeightedParam,
    description: 'Create criteria data',
  })
  @ValidateNested({
    message: 'criteria must be array',
    each: true,
  })
  @Type(() => CreateWeightedParam)
  params: CreateWeightedParam[];
}
