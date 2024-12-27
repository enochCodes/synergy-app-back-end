import AuthService from '../services/Auth.service';
import { findUserByEmail, createUser } from '../repository/user.repository';
import { GeneratesJWTToken, passwordHash } from '../utils/Auth.util';
import { UserSignUpDTO } from '../dtos/signup.user.dto';
import { LoginDTO } from '../dtos/Login.user.dto';
import bcrypt from 'bcrypt';
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
                status: 409,
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
                status: 500,
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
                status: 201,
                Data: 'jwt-token',
                success: true,
                message: 'User created successfully'
            });
        });

        it('should return error if user not found during login', async () => {
            const credentials: LoginDTO = {
                email: 'test@example.com',
                password: 'password123'
            };

            (findUserByEmail as jest.Mock).mockResolvedValue(null);

            const response = await authService.login(credentials);

            expect(response).toEqual({
                status: 404,
                Data: '',
                success: false,
                message: 'User not found'
            });
        });

        it('should return error if password is invalid during login', async () => {
            const credentials: LoginDTO = {
                email: 'test@example.com',
                password: 'password123'
            };

            const user = {
                id: '1',
                email: 'test@example.com',
                password: 'hashedpassword',
                role: 'BUSINESS',
                firstName: 'Test',
                lastName: 'User',
                userName: 'testuser'
            };

            (findUserByEmail as jest.Mock).mockResolvedValue(user);
            (bcrypt.compare as jest.Mock).mockImplementation((password, hashedPassword, callback) => {
                callback(null, false);
            });

            const response = await authService.login(credentials);

            expect(response).toEqual({
                status: 401,
                Data: '',
                success: false,
                message: 'Invalid password'
            });
        });

        it('should return success if login is successful', async () => {
            const credentials: LoginDTO = {
                email: 'test@example.com',
                password: 'password123'
            };

            const user = {
                id: '1',
                email: 'test@example.com',
                password: 'hashedpassword',
                role: 'BUSINESS',
                firstName: 'Test',
                lastName: 'User',
                userName: 'testuser'
            };

            (findUserByEmail as jest.Mock).mockResolvedValue(user);
            (bcrypt.compare as jest.Mock).mockImplementation((password, hashedPassword, callback) => {
                callback(null, true);
            });
            (GeneratesJWTToken as jest.Mock).mockResolvedValue('jwt-token');

            const response = await authService.login(credentials);

            expect(response).toEqual({
                status: 200,
                Data: 'jwt-token',
                success: true,
                message: 'Login successful'
            });
        });
    });