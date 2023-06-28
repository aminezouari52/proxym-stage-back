/*
  Warnings:

  - You are about to drop the `Interviews` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Interviews" DROP CONSTRAINT "Interviews_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Interviews" DROP CONSTRAINT "Interviews_userId_fkey";

-- DropTable
DROP TABLE "Interviews";

-- CreateTable
CREATE TABLE "Interview" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "supervisors" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Interview_userId_key" ON "Interview"("userId");

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
