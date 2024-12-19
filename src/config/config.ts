import fs from 'fs';
import path from 'path';

const privateKey = fs.readFileSync(path.join(__dirname, '../../jwtRS256.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, '../../jwtRS256.key.pub'), 'utf8');

export class Config {
    public RSA_PRIVATE_KEY: string;
    public RSA_PUBLIC_KEY: string;

    constructor() {
        this.RSA_PRIVATE_KEY = privateKey;
        this.RSA_PUBLIC_KEY = publicKey;
    }

    getRSAPrivateKey(): string {
        return this.RSA_PRIVATE_KEY;
    }

    getRSAPublicKey(): string {
        return this.RSA_PUBLIC_KEY;
    }
}