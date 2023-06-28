/*
  Warnings:

  - Added the required column `candidatesNumber` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Profiles" AS ENUM ('Engineer', 'Masters', 'License');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "projectId" INTEGER;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "candidatesNumber" INTEGER NOT NULL,
ADD COLUMN     "requiredProfiles" "Profiles"[],
ADD COLUMN     "technicalEnvironment" TEXT[];

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
