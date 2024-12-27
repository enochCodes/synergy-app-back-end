import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateCampaign = async (data: Prisma.CampaignsCreateInput) => {
  return await prisma.campaigns.create({
    data,
  });
};

export const GetMyCampaignsByUserID = async (UserID: number) => {
  return await prisma.campaigns.findMany({
    where: {
      business_id: UserID,
    },
  });
};

export const GetCampaignByID = async (campaignId: number) => {
  return await prisma.campaigns.findUnique({
    where: {
      campaign_id: campaignId,
    },
  });
};

export const UpdatemyCampaign = async (
  campaignId: number,
  data: Prisma.CampaignsUpdateInput,
  businessId: number,
) => {
  return await prisma.campaigns.update({
    where: {
      business_id: businessId,
      campaign_id: campaignId,
    },
    data,
  });
};

export const DeletemyCampaign = async (
  campaignId: number,
  businessId: number,
) => {
  return await prisma.campaigns.delete({
    where: {
      business_id: businessId,
      campaign_id: campaignId,
    },
  });
};
