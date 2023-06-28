import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ActiveDirectoryService } from './active-directory.service'
import { ApiTags, ApiParam } from '@nestjs/swagger'
import { LDAPLoginDto } from './dto/LDAP-login.dto'

@ApiTags('active-directory')
@Controller('active-directory')
export class ActiveDirectoryController {
  constructor(
    private readonly activeDirectoryService: ActiveDirectoryService
  ) {}

  @Post('findUser')
  async login(@Body() body: LDAPLoginDto): Promise<any> {
    return await this.activeDirectoryService.login(body.username, body.password)
  }
}
