import { Request, Response, NextFunction } from "express";
import {
  signupService,
  loginService,
  getMeService,
  updateProfileService,
  listUsersService,
} from "../services/user.service";
import { SUCCESS_RESPONSE } from "../utils/message";

const sanitizeUser = (user: any) => {
  const obj = user.toObject ? user.toObject() : user;
  delete obj.password;
  return obj;
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await signupService(req.body);

    return res.status(201).json({
      message: SUCCESS_RESPONSE.USER_REGISTERED,
      data: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, token } = await loginService(req.body);

    // res.cookie("access_token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //     path: "/",
    //   maxAge: 24 * 60 * 60 * 1000,
    // });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    return res.status(200).json({
      message: SUCCESS_RESPONSE.LOGIN_SUCCESS,
      data: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await getMeService(res.locals.user._id);

    return res.status(200).json({
      data: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await updateProfileService(
      res.locals.user._id,
      req.body
    );

    return res.status(200).json({
      message: SUCCESS_RESPONSE.PROFILE_UPDATED,
      data: sanitizeUser(user),
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("access_token");

  return res.status(200).json({
    message: SUCCESS_RESPONSE.LOGOUT_SUCCESS,
  });
};

export const listUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await listUsersService(req.query);

    return res.status(200).json({
      message: SUCCESS_RESPONSE.USERS_FETCHED,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
