import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserTestService } from './user-test.service';
import { PassUserTestDto } from './dto/pass-user-test.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OutputUserTestDto } from './dto/output-user-test.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { PassUserTestInviteDto } from './dto/pass-user-test-invite.dto';
import { UserTestTypesOutputDto } from './dto/user-test-types.output.dto';
import { UserTestListOutputDto } from './dto/user-test-list-output.dto';
import { UserTestOutputDto } from './dto/user-test-output.dto';

@Controller('user-test')
@ApiTags('User tests')
@ApiForbiddenResponse({ description: 'Unauthorized Request' })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserTestController {
  constructor(private readonly userTestService: UserTestService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: OutputUserTestDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  create(@Body() createUserTestDto: PassUserTestDto) {
    return this.userTestService.create(createUserTestDto);
  }

  @Post('inv')
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: OutputUserTestDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  createInvite(@Body() createUserTestDto: PassUserTestInviteDto) {
    return this.userTestService.createInv(createUserTestDto);
  }

  @Get('types')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: true,
    type: UserTestTypesOutputDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  async getTestTypes() {
    return this.userTestService.getTypes();
  }

  @Get('result/:typeId/all')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: true,
    type: UserTestListOutputDto,
  })
  async getResultsByType(@Param('typeId') typeId: string, @Req() req) {
    const filter = {
      test_id: parseInt(typeId),
      user_id: 0,
    };

    console.log(req.user);

    if (req.user.role == 0) filter.user_id = req.user.id;

    return this.userTestService.getResults(filter);
  }

  @Get('result/:userTestId')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: false,
    type: UserTestOutputDto,
  })
  async getResult(@Param('userTestId') userTestId: string) {
    return this.userTestService.getOneResult(parseInt(userTestId));
  }
}
