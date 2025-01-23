import { NextFunction, Request, Response } from "express";
import { DecodeJWTToken, VerifyJWTToken } from "../utils/Auth.util";
import { createErrorResponse } from "../utils/response.util";

const whitelist = ["/api/v1/auth/login", "/api/v1/auth/signup"];

export const Authorize = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (whitelist.includes(req.path)) {
    return next();
  }

  const authHeader = req.header("Authorization");
  if (!authHeader) {
    res.status(401).json(createErrorResponse("Unauthorized", 401));
    return;
  }

  const token = authHeader.split(" ")[1]; // Extract the token from the "Bearer <token>" format
  if (!token) {
    res.status(401).json(createErrorResponse("Unauthorized", 401));
    return;
  }

  try {
    VerifyJWTToken(token);
    const decoded = await DecodeJWTToken(token);
    res.locals.user = decoded;
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(401).json(createErrorResponse("Unauthorized", 401));
  }
};

export const BussinessOnly = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const reqUser = res.locals.user;
  if (reqUser.role !== "BUSINESS") {
    res.status(401).json(createErrorResponse("Unauthorized", 401));
    return;
  }
  next();
};

export const CreatorOnly = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const reqUser = res.locals.user;
  if (reqUser.role !== "CREATOR") {
    res.status(401).json(createErrorResponse("Unauthorized", 401));
    return;
  }
  next();
};
