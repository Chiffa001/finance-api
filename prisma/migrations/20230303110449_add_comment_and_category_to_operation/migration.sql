-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('INCOME', 'EXPENSE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "UserModel" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "UserModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccountModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "userModelId" INTEGER NOT NULL,

    CONSTRAINT "AccountModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userModelId" INTEGER NOT NULL,

    CONSTRAINT "CategoryModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperationModel" (
    "id" SERIAL NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "sum" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountModelId" INTEGER NOT NULL,
    "type" "OperationType" NOT NULL DEFAULT 'EXPENSE',
    "commentModelId" INTEGER,
    "categoryModelId" INTEGER NOT NULL,

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
ALTER TABLE "AccountModel" ADD CONSTRAINT "AccountModel_userModelId_fkey" FOREIGN KEY ("userModelId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryModel" ADD CONSTRAINT "CategoryModel_userModelId_fkey" FOREIGN KEY ("userModelId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationModel" ADD CONSTRAINT "OperationModel_accountModelId_fkey" FOREIGN KEY ("accountModelId") REFERENCES "AccountModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationModel" ADD CONSTRAINT "OperationModel_commentModelId_fkey" FOREIGN KEY ("commentModelId") REFERENCES "CommentModel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperationModel" ADD CONSTRAINT "OperationModel_categoryModelId_fkey" FOREIGN KEY ("categoryModelId") REFERENCES "CategoryModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
