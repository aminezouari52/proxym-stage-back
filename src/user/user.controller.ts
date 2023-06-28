import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  UsePipes,
  UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserRO } from './user.interface'
import {
  CreateUserDto,
  UpdateUserDto,
  LoginUserDto,
  UploadPhotoDto,
  UploadCVDto,
} from './dto'
import { User } from './user.decorator'
import { ValidationPipe } from '../shared/pipes/validation.pipe'

import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { Headers } from '@nestjs/common'
import { AuthGuard } from './auth.middleware'

@ApiBearerAuth()
@ApiTags('users')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('user')
  async findMe(@User('email') email: string): Promise<UserRO> {
    return await this.userService.findByEmail(email)
  }

  @UseGuards(AuthGuard)
  @Get('users/:email')
  async getCandidateById(@Param('email') email: string) {
    return this.userService.findByEmail(email)
  }

  @UseGuards(AuthGuard)
  @Get('users')
  async getAllUsers(): Promise<UserRO[]> {
    return await this.userService.findAll()
  }

  @UseGuards(AuthGuard)
  @Put('user')
  async update(@User('id') userId: number, @Body() userData: UpdateUserDto) {
    return await this.userService.update(userId, userData)
  }

  @UsePipes(new ValidationPipe())
  @Post('users/register')
  async create(@Body() userData: CreateUserDto) {
    return await this.userService.create(userData)
  }

  @UseGuards(AuthGuard)
  @Delete('user/:email')
  async delete(@Param('email') email: string) {}

  @UsePipes(new ValidationPipe())
  @Post('users/login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
    return await this.userService.login(loginUserDto)
  }

  @Get('user/verify')
  async verifyUser(@Headers('authorization') headers) {
    const token = (headers as string).split(' ')[1]
    return this.userService.verifyUser(token)
  }
  @Get('user/decode')
  async decodeToken(@Headers('authorization') headers) {
    const token = (headers as string).split(' ')[1]
    return this.userService.decodeToken(token)
  }

  @Post('user/upload-photo')
  async uploadPhoto(@Body() body: UploadPhotoDto) {
    return this.userService.uploadPhoto(body)
  }

  @Get('user/get-photo/:userId/')
  async getPhoto(@Param('userId') userId: number) {
    return this.userService.getPhoto(Number(userId))
  }

  @Post('user/upload-CV')
  async uploadCV(@Body() body: UploadCVDto) {
    return this.userService.uploadCV(body)
  }
}
