/*
  Warnings:

  - Changed the type of `status` on the `Application` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "logo" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropEnum
DROP TYPE "ApplicationStatus";
