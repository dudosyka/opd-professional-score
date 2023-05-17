import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OutputCriteriaDto } from './dto/output-criteria.dto';
import { CreateCriteriaDto } from './dto/create-criteria.dto';
import { CriteriaService } from './criteria.service';
import { UpdateCriteriaDto } from './dto/update-criteria.dto';

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
    description: 'Resource returned successfully',
    type: OutputCriteriaDto,
  })
  async getAll(): Promise<OutputCriteriaDto[]> {
    return this.criteriaService.getAll();
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Resource updated successfully',
    type: OutputCriteriaDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async update(
    @Body() updateCriteriaDto: UpdateCriteriaDto,
    @Param('id') id: string,
  ): Promise<OutputCriteriaDto> {
    return this.criteriaService.update(updateCriteriaDto, parseInt(id));
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Resource removed successfully',
    type: OutputCriteriaDto,
  })
  async remove(@Param('id') id: string): Promise<void> {
    await this.criteriaService.remove(parseInt(id));
  }
}
