import { CampaignDTO } from "../dtos/campaign.dto";
import { ResponseDTO, ResponseDTOwithObject } from "../dtos/response.dto";
import {
  createSuccessResponse,
  createSuccessResponseWithData,
} from "../utils/response.util";
import {
  CreateCampaign,
  GetMyCampaignsByUserID,
  GetCampaignByID,
  UpdatemyCampaign,
  DeletemyCampaign,
} from "../repository/campagin.repository";

export class CampaignService {
  // service layer for the  CampaignService
  // this service layer is responsible for creating a campaign
  public async createCampaign(campaignData: CampaignDTO): Promise<ResponseDTO> {
    // create campaign
    await CreateCampaign({
      title: campaignData.title,
      description: campaignData.description,
      endDate: new Date(campaignData.endDate),
      startDate: new Date(campaignData.startDate),
      budget: campaignData.budget,
      User: {
        connect: {
          id: campaignData.businessId,
        },
      },
      Sector: {
        connect: {
          sector_id: campaignData.sectorId,
        },
      },
    });
    return createSuccessResponse("", "campaign created successfully", 201);
  }

  public async getMyCampaigns(userID: number): Promise<ResponseDTOwithObject> {
    // get all campaigns
    const Campaigns = await GetMyCampaignsByUserID(userID);
    console.log(Campaigns);
    return createSuccessResponseWithData(
      Campaigns,
      "campaigns fetched successfully",
      200,
    );
  }

  public async getCampaign(campaignId: number): Promise<ResponseDTOwithObject> {
    // get campaign
    const campaign = await GetCampaignByID(campaignId);
    return createSuccessResponseWithData(
      campaign,
      "campaign fetched successfully",
      200,
    );
  }

  public async updatemyCampaign(
    businessId: number,
    campaignId: number,
    campaignData: CampaignDTO,
  ): Promise<ResponseDTO> {
    // update campaign
    const updatedCampaign = await UpdatemyCampaign(
      campaignId,
      {
        title: campaignData.title,
        description: campaignData.description,
        endDate: new Date(campaignData.endDate),
        startDate: new Date(campaignData.startDate),
        budget: campaignData.budget,
        Sector: {
          connect: {
            sector_id: campaignData.sectorId,
          },
        },
      },
      businessId,
    );
    if (!updatedCampaign) {
      return createSuccessResponse("", "campaign not updated", 400);
    }
    return createSuccessResponse("", "campaign updated successfully", 200);
  }

  public async deletemyCampaign(
    campaignId: number,
    businessId: number,
  ): Promise<ResponseDTO> {
    // delete campaign
    const deletedCampaign = await DeletemyCampaign(campaignId, businessId);
    if (!deletedCampaign) {
      return createSuccessResponse("", "campaign not deleted", 400);
    }
    return createSuccessResponse("", "campaign deleted successfully", 200);
  }
}
