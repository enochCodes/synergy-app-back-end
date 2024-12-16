// auth handler
import AuthService from '../services/AuthService';
import { Request, Response } from 'express';


export class AuthController {
    static async SignUp(req: Request, res: Response) {
        // handle signup
        const { email, password } = req.body;
        const authService = new AuthService();
        const response = await authService.signup(email, password);
        res
            .status(200)
            .json(response);
    }

    static async Login(req: Request, res: Response) {
        // handle login
        const { email, password } = req.body;
        const authService = new AuthService();
        const response = await authService.login(email, password);
        res
            .status(200)
            .json(response);

    }
}