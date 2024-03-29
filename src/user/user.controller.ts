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
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { OutputUserDto } from './dto/output-user.dto';
import TokenOutputDto from './dto/token-output.dto';
import LoginUserDto from './dto/login-user.dto';
import { CreateSimpleUserDto } from './dto/create-simple-user.dto';
import { OutputUserRateProfileDto } from './dto/output-user-rate-profile.dto';
import { RateProfileAnswer } from './dto/ml-input.dto';

@Controller('user')
@ApiForbiddenResponse({ description: 'Unauthorized Request' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiTags('Authorization')
  @UseGuards(LocalAuthGuard)
  @ApiCreatedResponse({
    description: 'The login was successfully proceed',
    type: TokenOutputDto,
  })
  login(
    @Req() req,
    @Body() loginUserDto: LoginUserDto,
  ): { token: string; role: number } {
    console.log(loginUserDto);
    return { token: this.userService.auth(req.user), role: req.user.role };
  }

  @Post('sign-up')
  @ApiTags('Authorization')
  @ApiCreatedResponse({
    description: 'The registration was successfully proceed',
    type: Boolean,
  })
  signUp(@Body() userDto: CreateSimpleUserDto) {
    return this.userService.createSimpleUser(userDto);
  }

  @Get('hash/:str')
  @ApiTags('Authorization')
  async hashStr(@Param('str') str: string) {
    return this.userService.hashStr(str);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('User CRUD')
  @Get('cur')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: OutputUserDto,
  })
  async getCurrentUser(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiTags('User CRUD')
  @Post()
  @ApiCreatedResponse({
    description: 'Created Successfully',
    type: OutputUserDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiResponse({
    description: 'Double record (duplicate login field)',
    status: HttpStatus.CONFLICT,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiTags('User CRUD')
  @Get()
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: true,
    type: OutputUserDto,
  })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('User CRUD')
  @Get('all/resp')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    isArray: true,
    type: OutputUserDto,
  })
  findAllResp() {
    return this.userService.findAllResp();
  }

  @ApiBearerAuth()
  @ApiTags('User CRUD')
  @Get(':id')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: OutputUserDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiTags('User CRUD')
  @Patch(':id')
  @ApiOkResponse({
    description: 'The resource was updated successfully',
    type: OutputUserDto,
  })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiTags('User CRUD')
  @Delete(':id')
  @ApiOkResponse({
    description: 'The resource was deleted successfully',
    type: OutputUserDto,
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource not found' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('Rate profile')
  @Get('/profile/rate')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: OutputUserDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  rateProfile(@Req() req): Promise<OutputUserRateProfileDto> {
    return this.userService.rate(+req.user.id, []);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('Rate profile')
  @Post('/profile/rate/:userId')
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: OutputUserDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Validation error' })
  rateProfileWithLearning(
    @Param('userId') id: string,
    @Body() answer: RateProfileAnswer,
  ): Promise<OutputUserRateProfileDto> {
    return this.userService.rate(+id, answer.answer);
  }
}
