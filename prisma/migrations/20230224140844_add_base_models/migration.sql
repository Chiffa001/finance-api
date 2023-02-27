/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `UserModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "UserModel" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "AccountModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "userModelId" INTEGER,

    CONSTRAINT "AcountModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userModelId" INTEGER,

    CONSTRAINT "CategoryModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperationModel" (
    "id" SERIAL NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "sum" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acountModelId" INTEGER NOT NULL,
    "type" "OperationType" NOT NULL DEFAULT 'EXPENSE',
    "commentModelId" INTEGER NOT NULL,

    CONSTRAINT "OperationModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentModel" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "CommentModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserModel_email_key" ON "UserModel"("email");

-- AddForeignKey
ALTER TABLE "AcountModel" ADD CONSTRAINT "AcountModel_userModelId_fkey" FOREIGN KEY ("userModelId") REFERENCES "UserModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryModel" ADD CONSTRAINT "CategoryModel_userModelId_fkey" FOREIGN KEY ("userModelId") REFERENCES "UserModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationModel" ADD CONSTRAINT "OperationModel_acountModelId_fkey" FOREIGN KEY ("acountModelId") REFERENCES "AcountModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationModel" ADD CONSTRAINT "OperationModel_commentModelId_fkey" FOREIGN KEY ("commentModelId") REFERENCES "CommentModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
