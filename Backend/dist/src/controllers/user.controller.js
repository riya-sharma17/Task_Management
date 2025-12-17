"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsers = exports.logout = exports.updateProfile = exports.getMe = exports.login = exports.signup = void 0;
const user_service_1 = require("../services/user.service");
const message_1 = require("../utils/message");
const sanitizeUser = (user) => {
    const obj = user.toObject ? user.toObject() : user;
    delete obj.password;
    return obj;
};
const signup = async (req, res, next) => {
    try {
        const user = await (0, user_service_1.signupService)(req.body);
        return res.status(201).json({
            message: message_1.SUCCESS_RESPONSE.USER_REGISTERED,
            data: sanitizeUser(user),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.signup = signup;
const login = async (req, res, next) => {
    try {
        const { user, token } = await (0, user_service_1.loginService)(req.body);
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
            message: message_1.SUCCESS_RESPONSE.LOGIN_SUCCESS,
            data: sanitizeUser(user),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const getMe = async (_req, res, next) => {
    try {
        const user = await (0, user_service_1.getMeService)(res.locals.user._id);
        return res.status(200).json({
            data: sanitizeUser(user),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
const updateProfile = async (req, res, next) => {
    try {
        const user = await (0, user_service_1.updateProfileService)(res.locals.user._id, req.body);
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.PROFILE_UPDATED,
            data: sanitizeUser(user),
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProfile = updateProfile;
const logout = async (_req, res) => {
    res.clearCookie("access_token");
    return res.status(200).json({
        message: message_1.SUCCESS_RESPONSE.LOGOUT_SUCCESS,
    });
};
exports.logout = logout;
const listUsers = async (req, res, next) => {
    try {
        const result = await (0, user_service_1.listUsersService)(req.query);
        return res.status(200).json({
            message: message_1.SUCCESS_RESPONSE.USERS_FETCHED,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.listUsers = listUsers;
//# sourceMappingURL=user.controller.js.map