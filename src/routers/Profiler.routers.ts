import { Application } from "express";
import { ProfilerController } from "../Controllers/profiler.controller";

const profilerController = new ProfilerController();

const injectProfilerRouters = (app: Application) => {
    // Profiler routes
    app.post('/api/v1/creator/profile', profilerController.setCreatorProfile);
};

export default injectProfilerRouters;