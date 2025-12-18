import { Schema, model } from "mongoose";
import { ITaskAudit } from "../interfaces/taskAudit.interface";
import { TaskStatus } from "../utils/enum";

const taskAuditSchema = new Schema<ITaskAudit>(
    {
        taskId: {
            type: Schema.Types.ObjectId,
            ref: "Task",
            required: true,
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        oldStatus: {
            type: String,
            enum: Object.values(TaskStatus),
            required: true,
        },
        newStatus: {
            type: String,
            enum: Object.values(TaskStatus),
            required: true,
        },
    },
    {
        timestamps: false,
        versionKey: false,
        collection: "task_audit_logs",
    }
);

const TaskAuditModel = model<ITaskAudit>(
    "TaskAuditLog",
    taskAuditSchema
);
export default TaskAuditModel;
