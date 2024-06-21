/*
  Warnings:

  - Changed the type of `addressType` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "addressType",
ADD COLUMN     "addressType" "AddressType" NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "couponId" INTEGER;

-- CreateIndex
CREATE INDEX "Order_couponId_idx" ON "Order"("couponId");
