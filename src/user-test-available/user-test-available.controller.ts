import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserTestAvailableService } from './user-test-available.service';
import { UpdateUserTestAvailableDto } from './dto/update-user-test-available.dto';
import { CreateUserTestAvailableDto } from './dto/create-user-test-available.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OutputUserTestAvailableDto } from './dto/output-user-test-available.dto';

@Controller('user-test-available')
@ApiTags('User available tests')
@ApiForbiddenResponse({ description: 'Unauthorized Request' })
@ApiBearerAuth()
export class UserTestAvailableController {
  constructor(
    private readonly userTestAvailableService: UserTestAvailableService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: OutputUserTestAvailableDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  create(@Body() createUserTestAvailableDto: CreateUserTestAvailableDto) {
    return this.userTestAvailableService.create(createUserTestAvailableDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: true,
    type: OutputUserTestAvailableDto,
  })
  findAll() {
    return this.userTestAvailableService.findAll();
  }

  @Get('/user/:userId')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: true,
    type: OutputUserTestAvailableDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  findByUser(@Param('userId') userId: number) {
    return this.userTestAvailableService.findByUser(userId);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: OutputUserTestAvailableDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  findOne(@Param('id') id: string) {
    return this.userTestAvailableService.findOne(+id);
  }

  @Patch(':userId')
  @ApiOkResponse({
    description: 'The resource was updated successfully',
    type: OutputUserTestAvailableDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  update(
    @Param('userId') id: string,
    @Body() updateUserTestAvailableDto: UpdateUserTestAvailableDto,
  ) {
    return this.userTestAvailableService.update(
      +id,
      updateUserTestAvailableDto,
    );
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The resource was deleted successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  remove(@Param('id') id: string) {
    return this.userTestAvailableService.remove(+id);
  }
}
