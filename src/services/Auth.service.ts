import { UserSignUpDTO } from "../dto/signup.user.dto";
import { LoginDTO } from "../dto/Login.user.dto";
import { ResponseDTO } from "../dto/response.dto";
import { createErrorResponse, createSuccessResponse } from "../utils/response.util";
import { findUserByEmail, createUser } from "../repository/user.repository";
import { GeneratesJWTToken, passwordHash } from "../utils/Auth.util";
import bcrypt from 'bcrypt';

class AuthService {
    /**
     * Registers a new user in the system.
     * 
     * @param {UserSignUpDTO} user - The user data transfer object containing user details.
     * @returns {Promise<ResponseDTO>} - A promise that resolves to a response object indicating the result of the signup process.
     * 
     * @throws {Error} - Throws an error if any required field is missing, if the email is invalid, if the user already exists, or if user creation fails.
     * 
     * The function performs the following steps:
     * 1. Validates that all required fields are provided.
     * 2. Validates the email format.
     * 3. Checks if a user with the provided email already exists.
     * 4. Hashes the user's password.
     * 5. Creates a new user with the provided details.
     * 6. Generates a JWT token for the new user.
     * 7. Returns a success response with the generated token.
     */
    public async signup(user: UserSignUpDTO): Promise<ResponseDTO> {
        if (!user.userName || !user.email || !user.password || !user.firstName || !user.lastName) {
            return createErrorResponse('All fields are required', 400);
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(user.email)) {
            return createErrorResponse('Invalid email address', 400);

        }

        const existingUser = await findUserByEmail(user.email);
        if (existingUser) {
            return createErrorResponse('User already exists', 409);
        }

        const hashedPassword = await passwordHash(user.password);
        const newUser = await createUser({
            ...user,
            password: hashedPassword,
        });

        if (!newUser) {
            return createErrorResponse('Failed to create user', 500);
        }

        const token = await GeneratesJWTToken(user);
        return createSuccessResponse(token, 'User created successfully', 201);
    }
    /**
     * Authenticates a user with the provided email and password.
     *
     * @param email - The email address of the user attempting to log in.
     * @param password - The password of the user attempting to log in.
     * @returns An object containing the email and password of the authenticated user.
     */
    public async login(UserCredential: LoginDTO): Promise<ResponseDTO> {
        // handle login
        const user = await findUserByEmail(UserCredential.email);
        if (!user) {
            return createErrorResponse('User not found', 404);
        }

        const isPasswordValid = await new Promise<boolean>((resolve, reject) => {
            bcrypt.compare(UserCredential.password, user.password, (err: Error | undefined, same: boolean) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(same);
                }
            });
        });

        if (!isPasswordValid) {
            return createErrorResponse('Invalid password', 401);
        }

        const token = GeneratesJWTToken({
            id: user.id.toString(),
            email: user.email,
            password: user.password,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName
        });

        return createSuccessResponse(token, 'Login successful', 200);
    }
}

export default AuthService;