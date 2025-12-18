"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskIdParamSchema = exports.listTaskQuerySchema = exports.updateTaskSchema = exports.createTaskSchema = void 0;
const zod_1 = require("zod");
const enum_1 = require("../utils/enum");
exports.createTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100),
    description: zod_1.z.string().optional(),
    dueDate: zod_1.z.coerce.date(),
    priority: zod_1.z.enum(Object.values(enum_1.TaskPriority)).optional(),
    status: zod_1.z
        .enum(Object.values(enum_1.TaskStatus))
        .optional(),
    assignedToId: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "assignedToId must be a valid ObjectId")
        .min(1, "assignedToId cannot be empty")
});
exports.updateTaskSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(100).optional(),
    description: zod_1.z.string().optional(),
    dueDate: zod_1.z.coerce.date().optional(),
    priority: zod_1.z
        .enum(Object.values(enum_1.TaskPriority))
        .optional(),
    status: zod_1.z
        .enum(Object.values(enum_1.TaskStatus))
        .optional(),
    assignedToId: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "assignedToId must be a valid ObjectId").optional()
});
exports.listTaskQuerySchema = zod_1.z.object({
    status: zod_1.z
        .enum(Object.values(enum_1.TaskStatus))
        .optional(),
    priority: zod_1.z
        .enum(Object.values(enum_1.TaskPriority))
        .optional(),
    sort: zod_1.z.enum(["dueDate"]).optional(),
});
exports.taskIdParamSchema = zod_1.z.object({
    id: zod_1.z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "assignedToId must be a valid ObjectId")
});
//# sourceMappingURL=task.validation.js.map