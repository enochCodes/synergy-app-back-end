import AuthService from '../services/Auth.service';
import { findUserByEmail, createUser } from '../repository/user.repository';
import { GeneratesJWTToken, passwordHash } from '../utils/Auth.util';
import { UserSignUpDTO } from '../dto/signup.user.dto';

jest.mock('../repository/user.repository');
jest.mock('../utils/Auth.util');

describe('AuthService', () => {
    let authService: AuthService;

    beforeEach(() => {
        authService = new AuthService();
    });

    it('should return error if any required field is missing', async () => {
        const user: UserSignUpDTO = {
            userName: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            role: 'BUSINESS'
        };

        const response = await authService.signup(user);

        expect(response).toEqual({
            status: 400,
            Data: '',
            success: false,
            message: 'All fields are required'
        });
    });

    it('should return error if email is invalid', async () => {
        const user: UserSignUpDTO = {
            userName: 'testuser',
            email: 'invalid-email',
            password: 'password123',
            firstName: 'Test',
            lastName: 'User',
            role: 'BUSINESS'
        };

        const response = await authService.signup(user);

        expect(response).toEqual({
            status: 400,
            Data: '',
            success: false,
            message: 'Invalid email address'
        });
    });

    it('should return error if user already exists', async () => {
        const user: UserSignUpDTO = {
            userName: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            firstName: 'Test',
            lastName: 'User',
            role: 'BUSINESS'
        };

        (findUserByEmail as jest.Mock).mockResolvedValue(true);

        const response = await authService.signup(user);

        expect(response).toEqual({
            status: 400,
            Data: '',
            success: false,
            message: 'User already exists'
        });
    });

    it('should return error if user creation fails', async () => {
        const user: UserSignUpDTO = {
            userName: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            firstName: 'Test',
            lastName: 'User',
            role: 'BUSINESS'
        };

        (findUserByEmail as jest.Mock).mockResolvedValue(false);
        (passwordHash as jest.Mock).mockResolvedValue('hashedpassword');
        (createUser as jest.Mock).mockResolvedValue(null);

        const response = await authService.signup(user);

        expect(response).toEqual({
            status: 400,
            Data: '',
            success: false,
            message: 'Failed to create user'
        });
    });

    it('should return success if user is created successfully', async () => {
        const user: UserSignUpDTO = {
            userName: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            firstName: 'Test',
            lastName: 'User',
            role: 'BUSINESS'
        };

        (findUserByEmail as jest.Mock).mockResolvedValue(false);
        (passwordHash as jest.Mock).mockResolvedValue('hashedpassword');
        (createUser as jest.Mock).mockResolvedValue(true);
        (GeneratesJWTToken as jest.Mock).mockResolvedValue('jwt-token');

        const response = await authService.signup(user);

        expect(response).toEqual({
            status: 200,
            Data: 'jwt-token',
            success: true,
            message: 'User created successfully'
        });
    });
});