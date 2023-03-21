import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserTestService } from './user-test.service';
import { PassUserTestDto } from './dto/pass-user-test.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OutputUserTestDto } from './dto/output-user-test.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

@Controller('user-test')
@ApiTags('User tests')
@ApiForbiddenResponse({ description: 'Unauthorized Request' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserTestController {
  constructor(private readonly userTestService: UserTestService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: OutputUserTestDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  create(@Body() createUserTestDto: PassUserTestDto) {
    return this.userTestService.create(createUserTestDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: true,
    type: OutputUserTestDto,
  })
  @UseGuards(AdminGuard)
  findAll() {
    return this.userTestService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: false,
    type: OutputUserTestDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  findOne(@Param('id') id: string) {
    return this.userTestService.findOne(+id);
  }

  @Get('/result/:userId')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: true,
    type: OutputUserTestDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  findByUser(@Param('userId') userId: number) {
    return this.userTestService.findByUser(userId);
  }

  @Get('/result/:userId/:testId')
  @UseGuards(AdminGuard)
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: true,
    type: OutputUserTestDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  findByUserTest(@Param('userId') userId, @Param('testId') testId: number) {
    return this.userTestService.findByUserTest(userId, testId);
  }
}
