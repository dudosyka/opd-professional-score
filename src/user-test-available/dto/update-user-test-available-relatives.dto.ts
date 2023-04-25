import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';

export class TestToRelative {
  @IsNumber()
  testId: number;
  relativeId: number;
}

export class UpdateUserTestAvailableRelativesDto {
  @ValidateNested({
    each: true,
  })
  @Type(() => TestToRelative)
  testToRelative: TestToRelative[];
}
