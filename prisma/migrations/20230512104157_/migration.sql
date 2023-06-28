/*
  Warnings:

  - Changed the type of `buffer` on the `ProfilePicture` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ProfilePicture" DROP COLUMN "buffer",
ADD COLUMN     "buffer" BYTEA NOT NULL;
