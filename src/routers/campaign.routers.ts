import { Application } from "express";
import { CampaignController } from "../Controllers/Campaign.controller";
import { BussinessOnly } from "../middleware/auth.middleware";

const campaignController = new CampaignController();
// campaign routers
const InjectCampaignRouters = (app: Application) => {
  app.post(
    "/api/v1/campaign",
    BussinessOnly,
    campaignController.createCampaign,
  );
  app.get(
    "/api/v1/mycampaign",
    BussinessOnly,
    campaignController.getmyCampaigns,
  );
  app.get("/api/v1/campaign/:id", campaignController.getCampaign);
  app.put(
    "/api/v1/mycampaign/:id",
    BussinessOnly,
    campaignController.updatemyCampaign,
  );
  app.delete("/api/v1/mycampaign/:id", campaignController.deletemyCampaign);
};

export default InjectCampaignRouters;
