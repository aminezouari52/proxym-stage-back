import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma/prisma.service'
import { UserService } from 'user/user.service'
import { SubmitApplicationDto } from './dto'
import { Application } from '@prisma/client'

@Injectable()
export class ApplicationService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService
  ) {}

  async findAll(): Promise<Application[]> {
    return await this.prisma.application.findMany()
  }

  async submit(payload: SubmitApplicationDto) {
    // get user
    const userEmail = payload.contactInfo.email
    const userData = await this.userService.findByEmail(userEmail)
    const userId = userData.id

    if (userData == null) {
      const error = {
        errorCode: 112,
        msg: 'user doesnt exist',
      }
      throw new HttpException(error, HttpStatus.NOT_FOUND)
    }

    // get projects Id
    const projectsId = payload.projects.map((project) => {
      return project.id
    })

    // Update user data
    await this.userService.userSubmission(
      userEmail,
      payload.contactInfo,
      payload.careerInfo.experience,
      payload.careerInfo.CV,
      payload.careerInfo.skills,
      payload.usefulLinks
    )

    projectsId.map(async (projectId) => {
      await this.prisma.application.create({
        data: {
          status: 'pending',
          user: { connect: { id: userId } },
          project: { connect: { id: projectId } },
        },
      })
    })

    return { userData }
  }

  async getAllApplicationsByUserId(userId: number): Promise<Application[]> {
    return this.prisma.application.findMany({
      where: {
        userId: Number(userId),
      },
      include: { project: true },
    })
  }

  async updateApplication(userId: number, projectId: number, status: any) {
    return await this.prisma.application.update({
      where: { userId_projectId: { userId, projectId } },
      data: { status },
    })
  }
}
