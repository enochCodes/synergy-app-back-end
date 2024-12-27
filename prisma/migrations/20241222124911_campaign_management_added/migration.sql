/*
  Warnings:

  - A unique constraint covering the columns `[influencer_id]` on the table `InfluencerProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Campaigns" (
    "campaign_id" SERIAL NOT NULL,
    "business_id" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "Campaigns_pkey" PRIMARY KEY ("campaign_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InfluencerProfile_influencer_id_key" ON "InfluencerProfile"("influencer_id");

-- AddForeignKey
ALTER TABLE "Campaigns" ADD CONSTRAINT "business_Id_fkey" FOREIGN KEY ("business_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
