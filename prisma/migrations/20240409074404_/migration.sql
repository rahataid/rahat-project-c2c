-- CreateTable
CREATE TABLE "tbl_beneficiaries" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "walletAddress" TEXT,
    "extras" JSONB,
    "beneficiariesReferred" INTEGER DEFAULT 0,
    "referralBeneficiaryId" TEXT,

    CONSTRAINT "tbl_beneficiaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_users" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "extras" JSONB,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "tbl_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_projects" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT,
    "extras" JSONB,
    "contractAddress" TEXT,
    "defaultTokenAddress" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "tbl_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OwnerProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_users_email_key" ON "tbl_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_projects_uuid_key" ON "tbl_projects"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "_OwnerProject_AB_unique" ON "_OwnerProject"("A", "B");

-- CreateIndex
CREATE INDEX "_OwnerProject_B_index" ON "_OwnerProject"("B");

-- AddForeignKey
ALTER TABLE "_OwnerProject" ADD CONSTRAINT "_OwnerProject_A_fkey" FOREIGN KEY ("A") REFERENCES "tbl_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OwnerProject" ADD CONSTRAINT "_OwnerProject_B_fkey" FOREIGN KEY ("B") REFERENCES "tbl_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
