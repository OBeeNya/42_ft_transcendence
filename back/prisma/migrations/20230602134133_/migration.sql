-- CreateEnum
CREATE TYPE "ChatType" AS ENUM ('PUBLIC', 'PRIVATE', 'PASSWORD');

-- CreateTable
CREATE TABLE "users" (
	"id" SERIAL NOT NULL,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	"name" TEXT NOT NULL,
	"hash" TEXT NOT NULL,
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
CREATE TABLE "user_blocks" (
	"id" SERIAL NOT NULL,
	"userId" INTEGER NOT NULL,
	"blockedId" INTEGER NOT NULL,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT "user_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_friends" (
	"id" SERIAL NOT NULL,
	"userId" INTEGER NOT NULL,
	"friendId" INTEGER NOT NULL,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

	CONSTRAINT "user_friends_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "chats" (
	"id" SERIAL NOT NULL,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"updatedAt" TIMESTAMP(3) NOT NULL,
	"name" TEXT NOT NULL,
	"type" "ChatType" NOT NULL DEFAULT 'PUBLIC',
	"password" TEXT,

	CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
	"id" SERIAL NOT NULL,
	"createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"content" TEXT NOT NULL,
	"userId" INTEGER NOT NULL,
	"chatId" INTEGER NOT NULL,

	CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_chats" (
	"userId" INTEGER NOT NULL,
	"chatId" INTEGER NOT NULL,
	"isOwner" BOOLEAN NOT NULL,
	"isBlocked" BOOLEAN NOT NULL,
	"permissions" TEXT NOT NULL,

	CONSTRAINT "user_chats_pkey" PRIMARY KEY ("userId","chatId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_oauthId_key" ON "users"("oauthId");

-- CreateIndex
CREATE UNIQUE INDEX "chats_name_key" ON "chats"("name");

-- AddForeignKey
ALTER TABLE "user_blocks" ADD CONSTRAINT "user_blocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_blocks" ADD CONSTRAINT "user_blocks_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_friends" ADD CONSTRAINT "user_friends_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_friends" ADD CONSTRAINT "user_friends_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matchhistory" ADD CONSTRAINT "matchhistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_chats" ADD CONSTRAINT "user_chats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_chats" ADD CONSTRAINT "user_chats_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
