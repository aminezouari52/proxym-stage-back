import { Module } from '@nestjs/common'
import { PrismaService } from 'prisma/prisma.service'
import { AdminController } from './admin.controller'
import { AdminService } from './admin.service'

@Module({
  providers: [AdminService, PrismaService],
  controllers: [AdminController],
})
export class AdminModule {}
