import { Controller, Get, Param } from '@nestjs/common';
import { PvkService } from './pvk.service';

@Controller('pvk')
export class PvkController {
  constructor(private readonly pvkService: PvkService) {}

  // @Post()
  // create(@Body() createPvkDto: CreatePvkDto) {
  //   return this.pvkService.create(createPvkDto);
  // }

  @Get()
  findAll() {
    return this.pvkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pvkService.findOne(+id);
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
