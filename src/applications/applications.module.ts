import { Module } from '@nestjs/common'
import { ApplicationService } from 'applications/applications.service'
import { UserService } from 'user/user.service'
import { PrismaService } from '../prisma/prisma.service'
import { ApplicationController } from 'applications/applications.controller'
import { UserModule } from 'user/user.module'

@Module({
  imports: [UserModule],
  providers: [ApplicationService, PrismaService],
  controllers: [ApplicationController],
  exports: [ApplicationService],
})
export class ApplicationsModule {}
