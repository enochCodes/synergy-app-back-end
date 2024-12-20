import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserSignUpDTO } from '../dto/signup.user.dto';
import { Config } from '../config/config';

const config = new Config();

export function GeneratesJWTToken(user: UserSignUpDTO): string {
    const RSASecretKey = config.getRSAPrivateKey();
    const token = jwt.sign(
        { id: user.id?.toString(), firstName: user.firstName, email: user.email, role: user.role },
        RSASecretKey,
        { algorithm: 'RS256', expiresIn: '2 days' }
    );
    return token;
}
export function VerifyJWTToken(token: string): object | string {
    try {
        return jwt.verify(token, config.getRSAPublicKey(), { algorithms: ['RS256'] });
    } catch {
        throw new Error('Token verification failed');
    }
}

export function DecodeJWTToken(token: string): Promise<jwt.JwtPayload> {
    return Promise.resolve(jwt.decode(token) as jwt.JwtPayload);
}

export function passwordHash(password: string): Promise<string> {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                reject(err);
            } else {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            }
        });
    });
}