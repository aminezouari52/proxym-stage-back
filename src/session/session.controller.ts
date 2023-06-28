import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { SessionService } from './session.service'
import { CreateSessionDto } from './dto/create-session.dto'
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger'

@ApiTags('sessions')
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('create')
  async create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionService.create(createSessionDto)
  }

  @Get('active')
  async findActiveSession() {
    return this.sessionService.findActiveSession()
  }
  @Get()
  async findAll() {
    return this.sessionService.findAll()
  }

  @ApiParam({ name: 'id', description: 'The ID of the session', type: Number })
  @Get(':id')
  async findOneById(@Param('id') id: number) {
    const session = await this.sessionService.findOneById(id)
    return { session }
  }
}
