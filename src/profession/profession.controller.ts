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
import { ProfessionService } from './profession.service';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
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
import OutputProfessionDto from './dto/output-profession.dto';
import { UpdatePvkProfDto } from './dto/update-pvk-prof.dto';

@Controller('profession')
@ApiTags('Profession CRUD')
@ApiForbiddenResponse({ description: 'Unauthorized Request' })
export class ProfessionController {
  constructor(private readonly professionService: ProfessionService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: OutputProfessionDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, ExpertGuard)
  create(@Req() req, @Body() createProfessionDto: CreateProfessionDto) {
    createProfessionDto.author_id = req.user.id;
    return this.professionService.create(createProfessionDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: true,
    type: OutputProfessionDto,
  })
  findAll() {
    return this.professionService.getAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: OutputProfessionDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  findOne(@Param('id') id: string) {
    return this.professionService.getOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'The resource was updated successfully',
    type: OutputProfessionDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, ExpertGuard)
  update(
    @Param('id') id: string,
    @Body() updateProfessionDto: UpdateProfessionDto,
  ) {
    return this.professionService.update(+id, updateProfessionDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The resource was deleted successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, ExpertGuard)
  remove(@Param('id') id: string) {
    return this.professionService.remove(+id);
  }

  @Post(':id/pvk')
  @ApiOkResponse({
    description: 'The resource was updated successfully',
    type: OutputProfessionDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, ExpertGuard)
  updatePvkProf(@Body() data: UpdatePvkProfDto, @Param('id') id: string) {
    return this.professionService.updatePvkProf(parseInt(id), data);
  }
}
