/*
  Warnings:

  - You are about to drop the column `projectId` on the `Admin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Admin" DROP CONSTRAINT "Admin_projectId_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "projectId";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "adminName" TEXT;
