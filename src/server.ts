import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

import express from 'express';
const app = express()
const port = process.env.PORT || 3000;
import injectAuthRouters from './routers/Auth.routers';

app.use(express.json());
//, inject the routers here
// inject auth routers
injectAuthRouters(app);

app.listen(port, (): void => {
    console.log(`app listening on port ${port}`)
})