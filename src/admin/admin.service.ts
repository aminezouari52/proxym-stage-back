import { Injectable } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { Admin } from '@prisma/client'
import { CreateInterviewDto } from './dto/create-interview.dto'
import { SendEmailDto } from './dto/send-email.dto'
import * as nodemailer from 'nodemailer'
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_USERNAME, EMAIL_PORT } from 'config'
import { CreateReviewDto } from './dto/create-review.dto'

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Admin[]> {
    return await this.prisma.admin.findMany()
  }

  async findSupervisors(): Promise<Admin[]> {
    return await this.prisma.admin.findMany({ where: { role: 'supervisor' } })
  }

  async createInterview(createInterviewDto: CreateInterviewDto) {
    const { userId, date, time, supervisors } = createInterviewDto
    return this.prisma.interview.create({
      data: {
        userId: userId,
        date: date,
        time: time,
        supervisors: supervisors,
      },
    })
  }

  async findAllInterviews() {
    return await this.prisma.interview.findMany({ include: { user: true } })
  }

  async getInterviewByUserId(userId: number) {
    return this.prisma.interview.findFirst({
      where: {
        userId: Number(userId),
      },
    })
  }

  async updateUserAttribute(userId: number, attribute: string, value: any) {
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: { [attribute]: value },
    })
    return updatedUser
  }

  async sendEmail(body: SendEmailDto) {
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: 'Amine Zouari <zouariamine52@gmail.com>',
      to: body.email,
      subject: body.subject,
      text: body.message,
    }
    try {
      await transporter.sendMail(mailOptions)
      return {
        status: 'success',
        message: 'email sent successfully!',
      }
    } catch (err) {
      console.log(err)
      return {
        status: 'failed',
        message: 'There was an error sending the email. Try again later!',
      }
    }
  }

  async getCandidatesByAdmin(adminId: number) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    })
    const applications = await this.prisma.application.findMany({
      include: { project: true, user: true },
    })

    const myCandidates = []

    applications.forEach((app) => {
      if (
        app.project.adminName === admin.username &&
        !myCandidates.find((candidate) => candidate.id == app.user.id)
      ) {
        myCandidates.push(app.user)
      }
    })

    return myCandidates
  }

  async createReview(body: CreateReviewDto) {
    return this.prisma.review.create({ data: body })
  }

  async getCandidateReviews(id: number) {
    return this.prisma.review.findMany({
      where: { userId: id },
      include: { admin: true },
    })
  }
}
