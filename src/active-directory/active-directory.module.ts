import { Module } from '@nestjs/common'
import { ActiveDirectoryController } from './active-directory.controller'
import { ActiveDirectoryService } from './active-directory.service'
import { PrismaService } from 'prisma/prisma.service'

@Module({
  providers: [ActiveDirectoryService, PrismaService],
  controllers: [ActiveDirectoryController],
})
export class ActiveDirectoryModule {}
