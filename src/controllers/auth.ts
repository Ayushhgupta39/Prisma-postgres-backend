import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { SignUpSchema } from "../schema/users";
import { UnprocessableEntity } from "../exceptions/validation";
import { NotFoundException } from "../exceptions/not-found";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  SignUpSchema.parse(req.body);
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
    new BadRequestsException(
      "User already exists!",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }

  try {
    user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
      },
    });

    res.status(201).json({ data: user, message: "User created successfully." });
  } catch (error) {
    // Handle any database-related errors here
    console.error("Error during user creation:", error);
    return next(
      new BadRequestsException(
        "Error during user creation",
        ErrorCode.USER_ALREADY_EXISTS
      )
    );
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } });

    if (!user) {
      throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestsException(
        "Incorrect password",
        ErrorCode.INCORRECT_PASSWORD
      );
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      JWT_SECRET
    );

    res.json({ user, token });
  } catch (error: any) {
    next(
      new UnprocessableEntity(
        error?.issues,
        "Unprocessable entity",
        ErrorCode.UNPROCESSABLE_ENTITY
      )
    );
  }
};

export const getCurrentUser = async(req: Request, res: Response, next: NextFunction) => {
  res.json({ data: (<any>req).user, message: "User found."})
}

