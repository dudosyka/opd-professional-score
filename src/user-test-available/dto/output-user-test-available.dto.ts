import { UserEntity } from '../../user/entities/user.entity';
import { TestEntity } from '../../test/entities/test.entity';
import { ApiProperty } from '@nestjs/swagger';
import { OutputTestDto } from '../../test/dto/output-test.dto';
import { OutputUserDto } from '../../user/dto/output-user.dto';

export class OutputUserTestAvailableDto {
  @ApiProperty({
    type: Number,
    description: 'UserTestAvailableEntity id',
  })
  id: number;

  @ApiProperty({
    type: Number,
    description: 'Relative id',
  })
  relative_id: number;

  @ApiProperty({
    type: Number,
    description: 'UserEntity id',
  })
  user_id: number;

  @ApiProperty({
    type: OutputUserDto,
    description: 'UserEntity',
  })
  user?: UserEntity;

  @ApiProperty({
    type: Number,
    description: 'TestEntity id',
  })
  test_id: number;

  @ApiProperty({
    type: OutputTestDto,
    description: 'TestEntity',
  })
  test?: TestEntity;
}
