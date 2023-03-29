import { Controller, Get, Param } from '@nestjs/common';
import { PvkService } from './pvk.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import OutputPvkDto from './dto/output-pvk.dto';

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
