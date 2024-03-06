import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { prismaClient } from "..";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Extract the token from header
    const token = req.headers.authorization;

    // 2. If token not present, throw unauthorized error
    if (!token) {
      next(
        new UnauthorizedException("Unauthorized access", ErrorCode.UNAUTHORIZED)
      );
    }

    // 3. If the token is present, verify the token and extract the payload
    const payload = jwt.verify(token as string, JWT_SECRET) as any;

    // 4. To get the user from the payload
    const user = await prismaClient.user.findFirst({
        where: { id: payload.userId },
    });

    if (!user) {
        next(
            new UnauthorizedException("Unauthorized access", ErrorCode.UNAUTHORIZED)
        );
    }

    // 5. To attach the user to the current request object
    req.user = user!;
  } catch (error) {
    new UnauthorizedException("Unauthorized access", ErrorCode.UNAUTHORIZED);
  }
};
