-- CreateTable
CREATE TABLE "InfluencerProfile" (
    "profile_id" SERIAL NOT NULL,
    "influencer_id" INTEGER NOT NULL,
    "niche" VARCHAR(255) NOT NULL,

    CONSTRAINT "InfluencerProfile_pkey" PRIMARY KEY ("profile_id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "userName" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "idx_user_email" ON "User"("email");

-- AddForeignKey
ALTER TABLE "InfluencerProfile" ADD CONSTRAINT "InfluencerProfile_Id_fkey" FOREIGN KEY ("influencer_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
