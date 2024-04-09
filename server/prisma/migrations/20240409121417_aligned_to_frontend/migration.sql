/*
  Warnings:

  - You are about to drop the column `groupId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Receiver` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `isSent` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Receiver" DROP CONSTRAINT "Receiver_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Receiver" DROP CONSTRAINT "Receiver_messageId_fkey";

-- DropForeignKey
ALTER TABLE "Receiver" DROP CONSTRAINT "Receiver_userId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "groupId",
ADD COLUMN     "conversationId" TEXT,
ADD COLUMN     "isSent" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "Receiver";

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "title" TEXT,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
