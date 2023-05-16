import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { TestService } from './test.service';
import { UpdateTestDto } from './dto/update-test.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OutputTestDto } from './dto/output-test.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

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

  @Get('/params')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: false,
  })
  async getAllWithParams() {
    return await this.testService.getAllWithParams();
  }
}
