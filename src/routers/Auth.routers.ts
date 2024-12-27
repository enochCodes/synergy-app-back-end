// Desc: Auth routes
import { AuthController } from '../Controllers/Auth.controller';
import { Application } from 'express';
const authController = new AuthController();

const injectAuthRouters = (app: Application) => {
    // Auth routes
    app.post('/api/v1/auth/signup',  authController.SignUp);
    app.post('/api/v1/auth/login', authController.Login);
}

export default injectAuthRouters;