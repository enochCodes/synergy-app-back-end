// Desc: Auth routes
import { AuthController } from '../Controllers/AuthController';

import { Application } from 'express';

const injectAuthRouters = (app: Application) => {
    // Auth routes
    app.post('api/v1/signup', AuthController.SignUp);
    app.post('api/v1/login', AuthController.Login);
}

export default injectAuthRouters