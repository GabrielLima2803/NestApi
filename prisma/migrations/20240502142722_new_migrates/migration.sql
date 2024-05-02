/*
  Warnings:

  - You are about to drop the `_CategoriaToPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoriaId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_CategoriaToPost_B_index";

-- DropIndex
DROP INDEX "_CategoriaToPost_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CategoriaToPost";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    CONSTRAINT "Post_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("createdAt", "id", "publicado", "titulo", "updatedAt") SELECT "createdAt", "id", "publicado", "titulo", "updatedAt" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_titulo_key" ON "Post"("titulo");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
