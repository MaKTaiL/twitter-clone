/*
  Warnings:

  - A unique constraint covering the columns `[tweetId,authorId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Like_authorId_key` ON `Like`;

-- DropIndex
DROP INDEX `Like_tweetId_key` ON `Like`;

-- CreateIndex
CREATE UNIQUE INDEX `Like_tweetId_authorId_key` ON `Like`(`tweetId`, `authorId`);
