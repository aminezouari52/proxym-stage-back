import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateSessionDto } from './dto/create-session.dto'

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSessionDto) {
    return this.prisma.session.create({ data })
  }

  async findAll() {
    return this.prisma.session.findMany({
      include: { candidates: true, projects: true },
    })
  }

  async findActiveSession() {
    return this.prisma.session.findFirst({
      where: { active: true },
      include: { candidates: true },
    })
  }

  async findOneById(id: number) {
    const session = await this.prisma.session.findUnique({
      where: { id: Number(id) },
    })
    if (!session) {
      const error = {
        errorCode: 113,
        msg: 'Session doesnt exist',
      }
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
    return session
  }
}
