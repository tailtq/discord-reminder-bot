-- CreateTable
CREATE TABLE "coins" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "binanceUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "coins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_updates" (
    "id" SERIAL NOT NULL,
    "coinId" INTEGER NOT NULL,
    "updatedTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "price_updates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_update_conversions" (
    "id" SERIAL NOT NULL,
    "priceUpdateId" INTEGER NOT NULL,
    "convertTo" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "volume24h" DOUBLE PRECISION NOT NULL,
    "percentChange" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "price_update_conversions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "price_updates" ADD CONSTRAINT "price_updates_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "coins"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_update_conversions" ADD CONSTRAINT "price_update_conversions_priceUpdateId_fkey" FOREIGN KEY ("priceUpdateId") REFERENCES "price_updates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
