import { Application } from "express";
import { ProfilerController } from "../Controllers/Creator.controller";
import { CreatorOnly } from "../middleware/auth.middleware";

const profilerController = new ProfilerController();

const injectCreatorsRouters = (app: Application) => {
  // Profiler routes
  app.post(
    "/api/v1/creator/profiler",
    CreatorOnly,
    profilerController.setCreatorProfile,
  );
};

export default injectCreatorsRouters;
