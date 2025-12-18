import { Document, Types } from "mongoose";
import { TaskStatus } from "../utils/enum";
export interface ITaskAudit extends Document {
    taskId: Types.ObjectId;
    updatedBy: Types.ObjectId;
    oldStatus: TaskStatus;
    newStatus: TaskStatus;
    updatedAt: Date;
}
//# sourceMappingURL=taskAudit.interface.d.ts.map