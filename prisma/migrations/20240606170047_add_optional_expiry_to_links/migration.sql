-- AlterTable
ALTER TABLE "RedirectLinks" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "ownerId" TEXT;

-- AddForeignKey
ALTER TABLE "RedirectLinks" ADD CONSTRAINT "RedirectLinks_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
