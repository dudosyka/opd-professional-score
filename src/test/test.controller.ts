import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Post,
} from '@nestjs/common';
import { TestService } from './test.service';
import { UpdateTestDto } from './dto/update-test.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OutputTestDto } from './dto/output-test.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CreateParamDto } from '../param/dto/create-param.dto';
import { TestParamEntity } from './entities/test.param.entity';
import { TestEntity } from './entities/test.entity';

@Controller('test')
@ApiTags('Test')
@ApiForbiddenResponse({ description: 'Unauthorized Request' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: true,
    type: OutputTestDto,
  })
  findAll(): Promise<OutputTestDto[]> {
    return this.testService.findAll();
  }

  @Get('/params')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: false,
  })
  async getAllWithParams() {
    return await this.testService.getAllWithParams();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: false,
    type: OutputTestDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  findOne(@Param('id') id: string): Promise<OutputTestDto> | never {
    return this.testService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The resource was updated successfully',
    type: OutputTestDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  update(
    @Param('id') id: string,
    @Body() updateTestDto: UpdateTestDto,
  ): Promise<OutputTestDto> | never {
    return this.testService.update(+id, updateTestDto);
  }

  @Post('/:id/params')
  @ApiCreatedResponse({
    description: 'The resource was created successfully',
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async createTestParam(
    @Param('id') id: string,
    @Body() createParamDto: CreateParamDto,
  ): Promise<TestParamEntity> {
    return this.testService.createParam(parseInt(id), createParamDto);
  }

  @Get('/:id/params')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: false,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async getWithParams(@Param('id') id: string): Promise<TestEntity> {
    return await this.testService.getWithParams(parseInt(id));
  }
}
