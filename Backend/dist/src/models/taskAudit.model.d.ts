import { ITaskAudit } from "../interfaces/taskAudit.interface";
declare const TaskAuditModel: import("mongoose").Model<ITaskAudit, {}, {}, {}, import("mongoose").Document<unknown, {}, ITaskAudit, {}, {}> & ITaskAudit & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>;
export default TaskAuditModel;
//# sourceMappingURL=taskAudit.model.d.ts.map