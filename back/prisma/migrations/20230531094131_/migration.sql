-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "friends" TEXT[],
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,
    "ladder_level" INTEGER NOT NULL DEFAULT 1,
    "oauthId" TEXT NOT NULL,
    "connected" BOOLEAN NOT NULL DEFAULT false,
    "tfa" BOOLEAN NOT NULL DEFAULT false,
    "tfa_key" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matchhistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "opponentName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ladder" INTEGER NOT NULL,
    "won" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "matchhistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- AddForeignKey
ALTER TABLE "matchhistory" ADD CONSTRAINT "matchhistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
