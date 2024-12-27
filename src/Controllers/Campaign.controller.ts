import { Request, Response } from "express";
import { createErrorResponse } from "../utils/response.util";
import { CampaignDTO } from "../dtos/campaign.dto";
import { CampaignService } from "../services/Campaign.service";
import { ResponseDTOwithObject } from "../dtos/response.dto";
import { validateCampaignUpdate } from "../validators/campaign.validator";
import { createSuccessResponse } from "../utils/response.util";
import { GetCampaignByID } from "../repository/campagin.repository";

const campaignService = new CampaignService();

export class CampaignController {
  // campaign controller
  public async createCampaign(req: Request, res: Response): Promise<void> {
    const reqUser = res.locals.user;
    const businessId = parseInt(reqUser.id);
    const campaignData: CampaignDTO = {
      title: req.body.title,
      description: req.body.description,
      budget: req.body.budget,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      sectorId: req.body.sector_id,
      businessId: businessId,
    };
    if (
      !campaignData.title ||
      !campaignData.description ||
      !campaignData.budget ||
      !campaignData.startDate ||
      !campaignData.endDate ||
      !campaignData.sectorId
    ) {
      res.status(400).json(createErrorResponse("All fields are required", 400));
    }
    // create campaign in to the sevice layer
    try {
      const response = await campaignService.createCampaign(campaignData);
      res.status(response.status).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  }
  public async getmyCampaigns(req: Request, res: Response): Promise<void> {
    // get all campaigns
    const reqUser = res.locals.user;
    const reqUserId = parseInt(reqUser.id);
    try {
      const response: ResponseDTOwithObject =
        await campaignService.getMyCampaigns(reqUserId);
      console.log(response);
      res.status(response.status).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  }
  public async getCampaign(req: Request, res: Response): Promise<void> {
    const CompaignId = parseInt(req.params.id);
    // get campaign
    try {
      // get campaign from the service layer
      const response = await campaignService.getCampaign(CompaignId);
      res.status(response.status).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  }
  public async updatemyCampaign(req: Request, res: Response): Promise<void> {
    const compaignId = parseInt(req.params.id);
    const reqUser = res.locals.user;
    const businessId = parseInt(reqUser.id);

    try {
      // Validate input
      const { error } = validateCampaignUpdate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const CampaignData = await GetCampaignByID(compaignId);
      if (CampaignData) {
        if (req.body.title) CampaignData.title = req.body.title;
        if (req.body.description)
          CampaignData.description = req.body.description;
        if (req.body.budget) CampaignData.budget = req.body.budget;
        if (req.body.startDate)
          CampaignData.startDate = new Date(req.body.startDate);
        if (req.body.endDate) CampaignData.endDate = new Date(req.body.endDate);
        if (req.body.sector_id)
          CampaignData.sector_id = req.body.sector_id as number;
      } else {
        const response = createSuccessResponse("", "campaign not found", 404);
        res.status(response.status).json(response);
        return;
      }

      // Call service layer
      const response = await campaignService.updatemyCampaign(
        businessId,
        compaignId,
        {
          ...CampaignData,
          startDate: CampaignData.startDate.toISOString(),
          endDate: CampaignData.endDate.toISOString(),
        },
      );

      res.status(response.status).json(response);
    } catch (error) {
      console.error("Error updating campaign:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  public async deletemyCampaign(req: Request, res: Response): Promise<void> {
    // delete campaign
    const reqUser = res.locals.user;
    const businessId = parseInt(reqUser.id);
    const campaignId = parseInt(req.params.id);
    try {
      const response = await campaignService.deletemyCampaign(
        businessId,
        campaignId,
      );
      res.status(response.status).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  }
}
