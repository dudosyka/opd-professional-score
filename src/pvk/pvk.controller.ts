import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PvkService } from './pvk.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ExpertGuard } from '../guards/expert.guard';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import OutputPvkDto from './dto/output-pvk.dto';

@Controller('pvk')
@ApiTags('PVK')
@ApiForbiddenResponse({ description: 'Unauthorized Request' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, ExpertGuard)
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
