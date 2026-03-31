/*
  Warnings:

  - Made the column `amount` on table `Disbursement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `amount` on table `DisbursementBeneficiary` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Disbursement" ALTER COLUMN "amount" SET NOT NULL;

-- AlterTable
ALTER TABLE "DisbursementBeneficiary" ALTER COLUMN "amount" SET NOT NULL;

-- CreateTable
CREATE TABLE "tbl_stats" (
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "group" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_stats_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_stats_name_key" ON "tbl_stats"("name");
