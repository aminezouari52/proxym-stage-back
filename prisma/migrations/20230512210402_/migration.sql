/*
  Warnings:

  - You are about to drop the `ProfilePicture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProfilePicture" DROP CONSTRAINT "ProfilePicture_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photo" TEXT;

-- DropTable
DROP TABLE "ProfilePicture";
