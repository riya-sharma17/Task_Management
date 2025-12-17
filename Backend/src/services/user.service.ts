import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import { ERROR_RESPONSE } from "../utils/message";
import { ApiError } from "../utils/ApiError";
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.PRIVATE_KEY) {
    throw new Error("Missing PRIVATE_KEY in environment variables");
}

const generateToken = (user: any) => {
    return jwt.sign(
        { _id: user._id, email: user.email, name: user.name },
        process.env.PRIVATE_KEY as string,
        { expiresIn: (process.env.ACCESS_TOKEN_EXPIRY as "1d") || "1d" }
    );
};

export const signupService = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    const exists = await userModel.findOne({ email: data.email });
    if (exists) {
        throw new ApiError(400, ERROR_RESPONSE.EMAIL_ALREADY_REGISTERED);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await userModel.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
    });

    return user;
};

export const loginService = async (data: {
    email: string;
    password: string;
}) => {
    const user = await userModel.findOne({ email: data.email });

    if (!user) {
        throw new ApiError(400, ERROR_RESPONSE.EMAIL_NOT_EXISTS);
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
        throw new ApiError(400, ERROR_RESPONSE.INCORRECT_PASSWORD);
    }

    const token = generateToken(user);

    return { user, token };
};

export const getMeService = async (userId: string) => {
    const user = await userModel.findById(userId);
    if (!user) {
        throw new ApiError(400, ERROR_RESPONSE.USER_NOT_FOUND);
    }
    return user;
};

export const updateProfileService = async (
    userId: string,
    data: { name?: string }
) => {
    const user = await userModel.findByIdAndUpdate(userId, data, {
        new: true,
    });

    if (!user) {
        throw new ApiError(400, ERROR_RESPONSE.USER_NOT_FOUND);
    }

    return user;
};

export const listUsersService = async (query: any) => {
    let { page = 1, limit = 10, search = "" } = query;

    page = Number(page);
    limit = Number(limit);

    const filter: any = {};

    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }

    const total = await userModel.countDocuments(filter);

    const users = await userModel
        .find(filter)
        .select("-password")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean();

    return {
        users,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page < Math.ceil(total / limit),
        },
    };
};
