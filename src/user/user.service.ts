import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto'
import {
  ContactInfoDto,
  ExperienceDto,
} from 'applications/dto/submit-application.dto'

import * as jwt from 'jsonwebtoken'
import { SECRET } from '../config'
import { UserRO } from './user.interface'
import { HttpException } from '@nestjs/common/exceptions/http.exception'
import { HttpStatus } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { SessionService } from 'session/session.service'

const select = {
  firstName: true,
  lastName: true,
  email: true,
}

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly sessionService: SessionService
  ) {}

  async findAll(): Promise<any[]> {
    return await this.prisma.user.findMany({ include: { applications: true } })
  }

  async login(payload: LoginUserDto): Promise<any> {
    const _user = await this.prisma.user.findFirst({
      where: { email: payload.email },
    })
    const error = {
      errorCode: 110,
      msg: 'E-mail or Password wrong',
    }

    if (!_user) {
      throw new HttpException(error, 401)
    }

    const authenticated = await bcrypt.compare(payload.password, _user.password)

    if (!authenticated) {
      throw new HttpException(error, 401)
    }

    const token = await this.generateJWT(_user)

    const { password, photo, ...user } = _user
    return {
      user: { token, ...user },
    }
  }

  async create(dto: CreateUserDto): Promise<UserRO> {
    const { firstName, lastName, email, password } = dto

    // check uniqueness of username/email
    const emailNotUnique = await this.prisma.user.findFirst({
      where: { email },
    })

    if (emailNotUnique) {
      const error = {
        errorCode: 111,
        msg: 'Email already exists',
      }

      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const data = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'candidate',
    }
    const user = await this.prisma.user.create({ data, select })

    return { user }
  }

  async update(id: number, data: UpdateUserDto): Promise<any> {
    const where = { id }
    const user = await this.prisma.user.update({ where, data, select })

    return { user }
  }

  async delete(email: string): Promise<any> {
    return await this.prisma.user.delete({ where: { email }, select })
  }

  async findById(id: number): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { id },
      select: { id: true, ...select },
    })
    return { user }
  }

  async findByEmail(email: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { email },
      include: { experience: true },
    })
    return user
  }

  public generateJWT(user) {
    const { password, photo, CV, ...userWithoutPassword } = user
    return jwt.sign(
      {
        ...userWithoutPassword,
      },
      SECRET,
      {
        expiresIn: '30m',
      }
    )
  }

  async verifyUser(token: string) {
    let user
    const decoded: any = jwt.verify(token, SECRET)
    if (decoded.role === 'candidate') {
      user = await this.prisma.user.findFirst({
        where: { id: decoded.id },
      })
    } else {
      user = await this.prisma.admin.findFirst({
        where: { username: decoded.username },
      })
    }

    const _newToken = this.generateJWT(user)

    return {
      user: { _newToken, ...user },
    }
  }

  async decodeToken(token: string) {
    let user
    const decoded: any = jwt.verify(token, SECRET)

    if (decoded.role === 'candidate') {
      user = await this.prisma.user.findFirst({
        where: { id: decoded.id },
      })
    } else {
      user = await this.prisma.admin.findFirst({
        where: { username: decoded.username },
      })
    }

    return { user }
  }
  async userSubmission(
    email: string,
    contactInfo: ContactInfoDto,
    experience: ExperienceDto[],
    CV: string,
    skills: string[],
    usefulLinks: string[]
  ) {
    const session = await this.sessionService.findActiveSession()

    return this.prisma.user.update({
      where: {
        email,
      },
      data: {
        ...contactInfo,
        experience: {
          create: experience,
        },
        CV,
        skills,
        usefulLinks,
        submissionDate: new Date(Date.now()).toISOString(),
        stage: 'pending',
        sessionId: session.id,
      },
      include: { experience: true },
    })
  }

  async getPhoto(userId: number): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    })
    return { photo: user.photo }
  }

  async uploadPhoto(body): Promise<any> {
    await this.prisma.user.update({
      where: {
        id: body.userId,
      },
      data: {
        photo: body.photo,
      },
    })
    return { success: 'Image uploaded successfully!' }
  }

  async uploadCV(body): Promise<any> {
    await this.prisma.user.update({
      where: {
        id: body.userId,
      },
      data: {
        CV: body.CV,
      },
    })
    return { success: 'CV uploaded successfully!' }
  }
}
