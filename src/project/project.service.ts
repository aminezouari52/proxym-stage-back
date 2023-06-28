import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { Project } from '@prisma/client'
import { PrismaService } from 'prisma/prisma.service'
import { CreateProjectDto } from './dto/create-project.dto'

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Project[]> {
    return await this.prisma.project.findMany({
      where: {
        session: {
          active: true,
        },
      },
    })
  }

  async findOneById(id: number) {
    const project = await this.prisma.project.findUnique({
      where: { id: Number(id) },
    })
    if (!project) {
      const error = {
        errorCode: 113,
        msg: 'Project doesnt exist',
      }
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
    return project
  }

  async create(data: CreateProjectDto) {
    return this.prisma.project.create({ data })
  }
}
