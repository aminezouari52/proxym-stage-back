/*
  Warnings:

  - You are about to drop the column `CIN` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "CIN",
DROP COLUMN "image",
ADD COLUMN     "nationalID" TEXT;
