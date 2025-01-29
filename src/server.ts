import dotenv from "dotenv";
import cors from "cors";
import { Authorize } from "./middleware/auth.middleware";
import injectAuthRouters from "./routers/Auth.routers";
import injectCreatorsRouters from "./routers/creators.routers";
import injectCampaignRouters from "./routers/campaign.routers";

// Load environment variables from .env file
dotenv.config();

import express from "express";
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*", // Replace this with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(Authorize);
//, inject the routers here
// inject auth routers
injectAuthRouters(app);
injectCreatorsRouters(app);
injectCampaignRouters(app);

app.listen(port, (): void => {
  console.log(`app listening on port ${port}`);
});
