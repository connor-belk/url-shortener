-- CreateTable
CREATE TABLE "RedirectLinks" (
    "id" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "redirectTo" TEXT NOT NULL,
    "hits" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RedirectLinks_pkey" PRIMARY KEY ("id")
);
