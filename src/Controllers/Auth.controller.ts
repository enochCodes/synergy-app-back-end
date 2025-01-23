// auth handler
import { Request, Response } from "express";
import { UserSignUpDTO } from "../dtos/signup.user.dto";
import { LoginDTO } from "../dtos/Login.user.dto";
import AuthService from "../services/Auth.service";

const authService = new AuthService();

export class AuthController {
  public async SignUp(req: Request, res: Response) {
    // handle signup
    const userData: UserSignUpDTO = {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
    };
    userData.userName = userData.firstName.toLowerCase();
    try {
      const response = await authService.signup(userData);
      res.status(response.status).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  }

  public async Login(req: Request, res: Response) {
    // handle login
    const UserLoginData: LoginDTO = {
      email: req.body.email,
      password: req.body.password,
    };
    const response = await authService.login(UserLoginData);
    res.status(response.status).json(response);
  }
}
