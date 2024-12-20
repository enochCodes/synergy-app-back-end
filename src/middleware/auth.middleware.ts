import { NextFunction, Request, Response } from "express";
import { DecodeJWTToken, VerifyJWTToken } from "../utils/Auth.util";
import { createErrorResponse } from '../utils/response.util';

const whitelist = [
    '/api/v1/signup',
    '/api/v1/login'
];

export const Authorize = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (whitelist.includes(req.path)) {
        return next();
    }

    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json(createErrorResponse('Unauthorized', 401));
        return;
    }

    try {
        VerifyJWTToken(token);
        const decoded = await DecodeJWTToken(token);
        res.locals.user = decoded;
        next();
    } catch (error) {
        console.error('Authorization error:', error);
        res.status(401).json({ error: 'Unauthorized' });
    }
};