-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "deadlineDate" TIMESTAMP(3),
ADD COLUMN     "description" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "maxCandidates" INTEGER,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
