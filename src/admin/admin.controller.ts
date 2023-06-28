import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { AdminService } from './admin.service'
import { Admin } from '@prisma/client'
import { CreateInterviewDto } from './dto/create-interview.dto'
import { createReadStream } from 'fs'
import { join } from 'path'
import type { Response } from 'express'
import { SendEmailDto } from './dto/send-email.dto'
import { CreateReviewDto } from './dto/create-review.dto'
const fs = require('fs')
@ApiTags('admins')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Get all Admins' })
  @Get()
  async getAllAdmins(): Promise<Admin[]> {
    return await this.adminService.findAll()
  }

  @ApiOperation({ summary: 'Get all Supervisors' })
  @Get('supervisors')
  async getAllSupervisors(): Promise<Admin[]> {
    return await this.adminService.findSupervisors()
  }

  @Post('interview')
  @ApiOperation({ summary: 'Create a new interview' })
  @ApiBody({ type: CreateInterviewDto })
  create(@Body() createInterviewDto: CreateInterviewDto) {
    return this.adminService.createInterview(createInterviewDto)
  }

  @Get('interviews')
  async getAllInterviews() {
    return await this.adminService.findAllInterviews()
  }

  @ApiOperation({ summary: 'Get interview by user ID' })
  @ApiParam({ name: 'userId', type: Number })
  @Get('interview/:userId')
  async getAllApplicationsByUserId(@Param('userId') userId: number) {
    return this.adminService.getInterviewByUserId(userId)
  }

  @Put(':id/stage')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: String })
  async updateUser(@Param('id') userId: string, @Body('stage') stage: string) {
    const updatedUser = await this.adminService.updateUserAttribute(
      +userId,
      'stage',
      stage
    )
    return updatedUser
  }

  @Get('download/PFEBook')
  async downloadFile(@Res() res: Response) {
    const fileStream = fs.createReadStream('public/proxym.pdf')
    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-Disposition', `attachment; filename="proxym.pdf"`)
    fileStream.pipe(res)
  }

  @Post('sendEmail')
  @ApiOperation({ summary: 'send an email' })
  @ApiBody({ type: SendEmailDto })
  sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.adminService.sendEmail(sendEmailDto)
  }

  @Get(':adminId/candidates')
  getCandidatesByAdmin(@Param('adminId') adminId: number) {
    return this.adminService.getCandidatesByAdmin(Number(adminId))
  }

  @Post('createReview')
  @ApiOperation({ summary: 'create a review for a candidate from an admin' })
  @ApiBody({ type: CreateReviewDto })
  createReview(@Body() createReviewDto: CreateReviewDto) {
    return this.adminService.createReview(createReviewDto)
  }

  @Get('reviews/:candidateId')
  getCandidateReviews(@Param('candidateId') candidateId: number) {
    return this.adminService.getCandidateReviews(Number(candidateId))
  }
}
