/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `coins` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[symbol]` on the table `coins` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "coins_name_key" ON "coins"("name");

-- CreateIndex
CREATE UNIQUE INDEX "coins_symbol_key" ON "coins"("symbol");
