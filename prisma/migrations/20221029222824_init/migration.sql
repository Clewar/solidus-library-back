-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT,
    "publisher" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
