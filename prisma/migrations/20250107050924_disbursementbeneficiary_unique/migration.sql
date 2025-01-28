/*
  Warnings:

  - A unique constraint covering the columns `[disbursementId,beneficiaryWalletAddress]` on the table `DisbursementBeneficiary` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DisbursementBeneficiary_disbursementId_beneficiaryWalletAdd_key" ON "DisbursementBeneficiary"("disbursementId", "beneficiaryWalletAddress");
