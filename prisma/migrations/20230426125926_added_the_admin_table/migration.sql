-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'supervisor');

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "department" TEXT,
    "jobTitle" TEXT,
    "role" "Role" NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
