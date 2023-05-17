import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OutputCriteriaDto } from './dto/output-criteria.dto';
import { CreateCriteriaDto } from './dto/create-criteria.dto';
import { CriteriaService } from './criteria.service';

@Controller('criteria')
@ApiTags('CRITERIA')
export class CriteriaController {
  constructor(private readonly criteriaService: CriteriaService) {}

  @Post('')
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: OutputCriteriaDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async createCriteria(
    @Body() createCriteriaDto: CreateCriteriaDto,
  ): Promise<OutputCriteriaDto> {
    return await this.criteriaService.create(createCriteriaDto);
  }

  @Get('')
  @ApiOkResponse({
    description: 'Resource returned successfuly',
    type: OutputCriteriaDto,
  })
  async getAll(): Promise<OutputCriteriaDto[]> {
    return this.criteriaService.getAll();
  }
}
