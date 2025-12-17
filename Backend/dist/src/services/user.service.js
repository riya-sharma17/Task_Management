"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsersService = exports.updateProfileService = exports.getMeService = exports.loginService = exports.signupService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const message_1 = require("../utils/message");
const ApiError_1 = require("../utils/ApiError");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
if (!process.env.PRIVATE_KEY) {
    throw new Error("Missing PRIVATE_KEY in environment variables");
}
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ _id: user._id, email: user.email, name: user.name }, process.env.PRIVATE_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d" });
};
const signupService = async (data) => {
    const exists = await user_model_1.default.findOne({ email: data.email });
    if (exists) {
        throw new ApiError_1.ApiError(400, message_1.ERROR_RESPONSE.EMAIL_ALREADY_REGISTERED);
    }
    const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
    const user = await user_model_1.default.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
    });
    return user;
};
exports.signupService = signupService;
const loginService = async (data) => {
    const user = await user_model_1.default.findOne({ email: data.email });
    if (!user) {
        throw new ApiError_1.ApiError(400, message_1.ERROR_RESPONSE.EMAIL_NOT_EXISTS);
    }
    const isMatch = await bcryptjs_1.default.compare(data.password, user.password);
    if (!isMatch) {
        throw new ApiError_1.ApiError(400, message_1.ERROR_RESPONSE.INCORRECT_PASSWORD);
    }
    const token = generateToken(user);
    return { user, token };
};
exports.loginService = loginService;
const getMeService = async (userId) => {
    const user = await user_model_1.default.findById(userId);
    if (!user) {
        throw new ApiError_1.ApiError(400, message_1.ERROR_RESPONSE.USER_NOT_FOUND);
    }
    return user;
};
exports.getMeService = getMeService;
const updateProfileService = async (userId, data) => {
    const user = await user_model_1.default.findByIdAndUpdate(userId, data, {
        new: true,
    });
    if (!user) {
        throw new ApiError_1.ApiError(400, message_1.ERROR_RESPONSE.USER_NOT_FOUND);
    }
    return user;
};
exports.updateProfileService = updateProfileService;
const listUsersService = async (query) => {
    let { page = 1, limit = 10, search = "" } = query;
    page = Number(page);
    limit = Number(limit);
    const filter = {};
    if (search) {
        filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }
    const total = await user_model_1.default.countDocuments(filter);
    const users = await user_model_1.default
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
exports.listUsersService = listUsersService;
//# sourceMappingURL=user.service.js.map