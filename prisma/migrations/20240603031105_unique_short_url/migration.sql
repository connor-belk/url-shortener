/*
  Warnings:

  - A unique constraint covering the columns `[shortUrl]` on the table `RedirectLinks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RedirectLinks_shortUrl_key" ON "RedirectLinks"("shortUrl");
