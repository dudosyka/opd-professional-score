import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TestToRelative {
  @IsNumber(
    {},
    {
      message: 'testId must be number',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'UserTestAvailableEntity id',
  })
  testId: number;

  @IsNumber(
    {},
    {
      message: 'relativeId must be number',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'relative_id of Test',
  })
  relativeId: number;
}

export class UpdateUserTestAvailableRelativesDto {
  @ValidateNested({
    each: true,
  })
  @Type(() => TestToRelative)
  testToRelative: TestToRelative[];
}
