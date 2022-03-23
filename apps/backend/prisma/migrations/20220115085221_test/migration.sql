/*
  Warnings:

  - Added the required column `images` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainImage` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `users` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "images" TEXT NOT NULL,
ADD COLUMN     "mainImage" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "users" TEXT NOT NULL;
