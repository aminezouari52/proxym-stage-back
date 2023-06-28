import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module'
import { ApplicationsModule } from './applications/applications.module'
import { SessionModule } from './session/session.module';
import { AdminModule } from './admin/admin.module';
import { ProjectModule } from './project/project.module';
import { ActiveDirectoryModule } from './active-directory/active-directory.module';

@Module({
  imports: [PrismaModule, UserModule, ApplicationsModule, SessionModule, AdminModule, ProjectModule, ActiveDirectoryModule],
  controllers: [AppController],
  providers: [],
})
export class ApplicationModule {}
