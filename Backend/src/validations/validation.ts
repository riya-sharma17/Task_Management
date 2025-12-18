// import { ZodObject, ZodError } from "zod";
// import { Request, Response, NextFunction } from "express";
// import { ApiError } from "../utils/ApiError";

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

import { ZodError, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

const formatZodError = (error: ZodError) => {
    return error.issues
        .map(issue => {
            const field = issue.path.join(".");
            return field
                ? `${field}: ${issue.message}`
                : issue.message;
        })
        .join(", ");
};

export const validateRequest =
    (schema: ZodObject) =>
        (req: Request, _res: Response, next: NextFunction) => {
            try {
                req.body = schema.parse(req.body);
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return next(new ApiError(400, formatZodError(error)));
                }
                next(error);
            }
        };

export const validateQuery =
    (schema: ZodObject) =>
        (req: Request, _res: Response, next: NextFunction) => {
            try {
                const parsed = schema.parse(req.query);
                req.query = parsed as any;
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return next(new ApiError(400, formatZodError(error)));
                }
                next(error);
            }
        };

export const validateParams =
    (schema: ZodObject) =>
        (req: Request, _res: Response, next: NextFunction) => {
            try {
                const parsed = schema.parse(req.params);
                req.params = parsed as any;
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    return next(new ApiError(400, formatZodError(error)));
                }
                next(error);
            }
        };
