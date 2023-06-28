/*
  Warnings:

  - You are about to drop the column `filePath` on the `ProfilePicture` table. All the data in the column will be lost.
  - Added the required column `buffer` to the `ProfilePicture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ProfilePicture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProfilePicture" DROP COLUMN "filePath",
ADD COLUMN     "buffer" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
