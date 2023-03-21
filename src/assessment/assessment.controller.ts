import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ExpertGuard } from '../guards/expert.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OutputAssessmentDto } from './dto/output-assessment.dto';
import { AssessmentEntity } from './entities/assessment.entity';

@Controller('assessment')
@ApiTags('Assessment CRUD')
@ApiForbiddenResponse({ description: 'Unauthorized Request' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ExpertGuard)
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: OutputAssessmentDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  create(@Body() createAssessmentDto: CreateAssessmentDto, @Req() req) {
    createAssessmentDto.user_id = req.user.id;
    return this.assessmentService.create(createAssessmentDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: OutputAssessmentDto,
    isArray: true,
  })
  async findAll(): Promise<OutputAssessmentDto[]> {
    return await this.assessmentService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: OutputAssessmentDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async findOne(@Param('id') id: string): Promise<OutputAssessmentDto> {
    const model = await this.assessmentService.findOne(+id);
    if (!(model instanceof AssessmentEntity)) return model;
  }

  @Get('/profession/:prof_id')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: OutputAssessmentDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  async findByProfession(
    @Param('prof_id') prof_id: string,
  ): Promise<OutputAssessmentDto[]> {
    return await this.assessmentService.findByProfession(+prof_id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The resource was updated successfully',
    type: OutputAssessmentDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateAssessmentDto: UpdateAssessmentDto,
  ) {
    updateAssessmentDto.user_id = req.user.id;
    return this.assessmentService.update(+id, updateAssessmentDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The resource was deleted successfully',
    type: Boolean,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  remove(@Param('id') id: string) {
    return this.assessmentService.remove(+id);
  }
}
