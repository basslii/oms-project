-- CreateTable
CREATE TABLE "Auth" (
    "id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Auth_id_key" ON "Auth"("id");

-- AddForeignKey
ALTER TABLE "Auth" ADD CONSTRAINT "Auth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
