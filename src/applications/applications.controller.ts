import { Body, Controller, Param, Put } from '@nestjs/common'
import { ApplicationService } from './applications.service'

import { SubmitApplicationDto, UpdateApplicationDto } from './dto'

import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { Get, Post } from '@nestjs/common'
import { Application } from '@prisma/client'

@ApiBearerAuth()
@ApiTags('applications')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post('/submit')
  async submit(
    @Body() submitApplicationDto: SubmitApplicationDto
  ): Promise<any> {
    return await this.applicationService.submit(submitApplicationDto)
  }

  @ApiOperation({ summary: 'Get all applications' })
  @Get()
  async getAllProjects(): Promise<Application[]> {
    return await this.applicationService.findAll()
  }

  @ApiOperation({ summary: 'Get all applications by user ID' })
  @ApiParam({ name: 'userId', type: Number })
  @Get(':userId')
  async getAllApplicationsByUserId(
    @Param('userId') userId: number
  ): Promise<Application[]> {
    return this.applicationService.getAllApplicationsByUserId(userId)
  }

  @Put('application/status')
  @ApiOperation({ summary: 'Update an application status' })
  async updateStatus(
    @Body()
    data: UpdateApplicationDto
  ) {
    return this.applicationService.updateApplication(
      data.userId,
      data.projectId,
      data.status
    )
  }
}
