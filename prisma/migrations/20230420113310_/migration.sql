-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_sessionId_fkey";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "sessionId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "sessionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE SET NULL ON UPDATE CASCADE;
