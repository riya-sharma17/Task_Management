import { z } from "zod";
import { TaskPriority, TaskStatus } from "../utils/enum";

export const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  dueDate: z.coerce.date(),
  priority: z.enum(Object.values(TaskPriority) as [string, ...string[]]).optional(),
  status: z
    .enum(Object.values(TaskStatus) as [string, ...string[]])
    .optional(),
  assignedToId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "assignedToId must be a valid ObjectId")
    .min(1, "assignedToId cannot be empty")
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  priority: z
    .enum(Object.values(TaskPriority) as [string, ...string[]])
    .optional(),
  status: z
    .enum(Object.values(TaskStatus) as [string, ...string[]])
    .optional(),
  assignedToId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "assignedToId must be a valid ObjectId").optional()
});

export const listTaskQuerySchema = z.object({
  status: z
    .enum(Object.values(TaskStatus) as [string, ...string[]])
    .optional(),
  priority: z
    .enum(Object.values(TaskPriority) as [string, ...string[]])
    .optional(),
  sort: z.enum(["dueDate"]).optional(),
});

export const taskIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "assignedToId must be a valid ObjectId")
});
