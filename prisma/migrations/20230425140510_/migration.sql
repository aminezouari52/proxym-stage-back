/*
  Warnings:

  - Added the required column `stage` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Stage" AS ENUM ('pending', 'filtered', 'interviewed', 'accepted', 'rejected');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "stage",
ADD COLUMN     "stage" "Stage" NOT NULL;
