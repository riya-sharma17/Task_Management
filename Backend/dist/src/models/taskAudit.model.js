"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enum_1 = require("../utils/enum");
const taskAuditSchema = new mongoose_1.Schema({
    taskId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
    updatedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    oldStatus: {
        type: String,
        enum: Object.values(enum_1.TaskStatus),
        required: true,
    },
    newStatus: {
        type: String,
        enum: Object.values(enum_1.TaskStatus),
        required: true,
    },
}, {
    timestamps: false,
    versionKey: false,
    collection: "task_audit_logs",
});
const TaskAuditModel = (0, mongoose_1.model)("TaskAuditLog", taskAuditSchema);
exports.default = TaskAuditModel;
//# sourceMappingURL=taskAudit.model.js.map