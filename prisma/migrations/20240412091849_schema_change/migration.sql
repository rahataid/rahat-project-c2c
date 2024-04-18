/*
  Warnings:

  - You are about to drop the `_OwnerProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tbl_users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OwnerProject" DROP CONSTRAINT "_OwnerProject_A_fkey";

-- DropForeignKey
ALTER TABLE "_OwnerProject" DROP CONSTRAINT "_OwnerProject_B_fkey";

-- DropTable
DROP TABLE "_OwnerProject";

-- DropTable
DROP TABLE "tbl_projects";

-- DropTable
DROP TABLE "tbl_users";
