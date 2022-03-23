-- AlterTable
ALTER TABLE "User" ADD COLUMN     "confirmTokenHash" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;
