// Desc: Auth routes
import { AuthController } from '../Controllers/Auth.controller';
import { Authorize } from "../middleware/auth.middleware";
import { Application } from 'express';

const injectAuthRouters = (app: Application) => {
    app.use(Authorize);
    // Auth routes
    app.post('/api/v1/signup', AuthController.SignUp);
    app.post('/api/v1/login', AuthController.Login);
}

export default injectAuthRouters