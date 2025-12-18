import { z } from "zod";
export declare const createTaskSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodCoercedDate<unknown>;
    priority: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    assignedToId: z.ZodString;
}, z.core.$strip>;
export declare const updateTaskSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    priority: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    assignedToId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const listTaskQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    priority: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    sort: z.ZodOptional<z.ZodEnum<{
        dueDate: "dueDate";
    }>>;
}, z.core.$strip>;
export declare const taskIdParamSchema: z.ZodObject<{
    id: z.ZodString;
}, z.core.$strip>;
//# sourceMappingURL=task.validation.d.ts.map