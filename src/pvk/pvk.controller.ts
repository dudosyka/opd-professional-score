import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PvkService } from './pvk.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import OutputPvkDto from './dto/output-pvk.dto';
import { EvaluationCriteriaEntity } from './entities/evaluation.criteria.entity';
import { CreateCriteriaDto } from './dto/create-criteria.dto';

@Controller('pvk')
@ApiTags('PVK')
export class PvkController {
  constructor(private readonly pvkService: PvkService) {}

  // @Post()
  // create(@Body() createPvkDto: CreatePvkDto) {
  //   return this.pvkService.create(createPvkDto);
  // }

  @Get()
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: true,
    type: OutputPvkDto,
  })
  findAll() {
    return this.pvkService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: OutputPvkDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  findOne(@Param('id') id: string) {
    return this.pvkService.getOne(+id);
  }

  @Post(':id/criteria')
  @ApiOkResponse({
    description: 'The resource was updates successfully',
  })
  @ApiNotFoundResponse({ description: 'Rosource not found' })
  criteriaSet(
    @Body('criteries') data: CreateCriteriaDto[],
    @Param('id') id: string,
  ): Promise<EvaluationCriteriaEntity[]> {
    return this.pvkService.criteriaSet(parseInt(id), data);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePvkDto: UpdatePvkDto) {
  //   return this.pvkService.update(+id, updatePvkDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.pvkService.remove(+id);
  // }
}
