// profiler repository
import { InfluencerProfile, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const setProfile = async (data: Prisma.InfluencerProfileCreateInput) => {
    return await prisma.influencerProfile.create({
        data,
    });
    };

    export const FindCreatorProfile = async (id: number): Promise<InfluencerProfile | null> => {
      return await prisma.influencerProfile.findUnique({
        where: { influencer_id: id },
      });
    };