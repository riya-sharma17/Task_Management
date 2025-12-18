"use strict";
// import { ZodObject, ZodError } from "zod";
// import { Request, Response, NextFunction } from "express";
// import { ApiError } from "../utils/ApiError";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateQuery = exports.validateRequest = void 0;
// export const validateRequest =
//     (schema: ZodObject) =>
//         (req: Request, _res: Response, next: NextFunction) => {
//             try {
//                 const parsed = schema.parse(req.body);
//                 req.body = parsed as any;
//                 next();
//             } catch (error) {
//                 if (error instanceof ZodError) {
//                     return next(
//                         new ApiError(
//                             400,
//                             error.issues.map(issue => issue.message).join(", ")
//                         )
//                     );
//                 }
//                 next(error);
//             }
//         };
// export const validateQuery =
//     (schema: ZodObject) =>
//         (req: Request, _res: Response, next: NextFunction) => {
//             try {
//                 const parsed = schema.parse(req.query);
//                 req.query = parsed as any;
//                 next();
//             } catch (error) {
//                 if (error instanceof ZodError) {
//                     return next(
//                         new ApiError(
//                             400,
//                             error.issues.map(issue => issue.message).join(", ")
//                         )
//                     );
//                 }
//                 next(error);
//             }
//         };
// export const validateParams =
//     (schema: ZodObject) =>
//         (req: Request, _res: Response, next: NextFunction) => {
//             try {
//                 const parsed = schema.parse(req.params);
//                 req.params = parsed as any;
//                 next();
//             } catch (error) {
//                 if (error instanceof ZodError) {
//                     return next(
//                         new ApiError(
//                             400,
//                             error.issues.map(issue => issue.message).join(", ")
//                         )
//                     );
//                 }
//                 next(error);
//             }
//         };
const zod_1 = require("zod");
const ApiError_1 = require("../utils/ApiError");
const formatZodError = (error) => {
    return error.issues
        .map(issue => {
        const field = issue.path.join(".");
        return field
            ? `${field}: ${issue.message}`
            : issue.message;
    })
        .join(", ");
};
const validateRequest = (schema) => (req, _res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return next(new ApiError_1.ApiError(400, formatZodError(error)));
        }
        next(error);
    }
};
exports.validateRequest = validateRequest;
const validateQuery = (schema) => (req, _res, next) => {
    try {
        const parsed = schema.parse(req.query);
        req.query = parsed;
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return next(new ApiError_1.ApiError(400, formatZodError(error)));
        }
        next(error);
    }
};
exports.validateQuery = validateQuery;
const validateParams = (schema) => (req, _res, next) => {
    try {
        const parsed = schema.parse(req.params);
        req.params = parsed;
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return next(new ApiError_1.ApiError(400, formatZodError(error)));
        }
        next(error);
    }
};
exports.validateParams = validateParams;
//# sourceMappingURL=validation.js.map