import dotenv from 'dotenv';
import { Authorize } from "./middleware/auth.middleware";


// Load environment variables from .env file
dotenv.config();

import express from 'express';
const app = express()
const port = process.env.PORT || 3000;
import injectAuthRouters from './routers/Auth.routers';
import injectProfilerRouters from './routers/Profiler.routers';
import InjectCampaignRouters from './routers/campaign.routers';

app.use(express.json());
app.use(Authorize);
//, inject the routers here
// inject auth routers
injectAuthRouters(app);
injectProfilerRouters(app);
InjectCampaignRouters(app);

app.listen(port, (): void => {
    console.log(`app listening on port ${port}`)
})