import React, { useState } from "react";
import "./style.css"
import { useTasks } from "../../hooks/useTasks";
import type { Task } from "../../utils/type";
import FullPageLoader from "../spinner/FullPageLoader";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import CustomModal from "../modal";
import { useFormik } from "formik";
import SelectDropdown from "../dropdowns/SelectDropdown";
import { TaskPriority, TaskStatus } from "../../utils/enum";
import UserSelectDropdown from "../dropdowns/UserSelectDropdown";
import { useCreateTask } from "../../hooks/useCreateTask";
import { taskValidationSchema, updateTaskValidationSchema } from "../../utils/validationSchema";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useDeleteTask } from "../../hooks/useDeleteTask";
import FilterSelect from "../dropdowns/FilterSelect";


const TaskTable: React.FC = () => {
    const { _id: myId } = useSelector((state: RootState) => state.auth.user)
    const [filters, setFilters] = useState({
        status: "",
        priority: "",
    });

    const { data: tasks, isLoading, isError } = useTasks(filters);
    // const { data: tasks, isLoading, isError } = useTasks();


    const createTask = useCreateTask();
    const updateTask = useUpdateTask();
    const deleteTask = useDeleteTask();

    const [taskModal, setTaskModal] = useState<{
        open: boolean;
        mode: "create" | "edit";
        task: Task | null;
    }>({
        open: false,
        mode: "create",
        task: null,
    });

    const [deleteModal, setDeleteModal] = useState<{
        open: boolean;
        taskId: string | null;
    }>({
        open: false,
        taskId: null,
    });



    const handleAdd = () => {
        setTaskModal({
            open: true,
            mode: "create",
            task: null,
        });
    };

    const closeModal = () => {
        taskForm.resetForm();
        taskForm.setTouched({});
        setTaskModal({
            open: false,
            mode: "create",
            task: null,
        });
    };

    const handleEdit = (task: Task) => {
        setTaskModal({
            open: true,
            mode: "edit",
            task,
        });
    };

    const handleDelete = (taskId: string) => {
        setDeleteModal({
            open: true,
            taskId,
        });
    }

    const deleteConfirmHandler = () => {
        if (deleteModal.taskId) {
            deleteTask.mutate(deleteModal.taskId, {
                onSuccess: () => {
                    setDeleteModal({
                        open: false,
                        taskId: null,
                    });
                },
            });
        }
    }


    const taskForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: taskModal.task?.title || "",
            description: taskModal.task?.description || "",
            dueDate: taskModal.task?.dueDate?.split("T")[0] || "",
            priority: taskModal.task?.priority || "",
            status: taskModal.task?.status || "",
            assignedToId: taskModal.task?.assignedToId?._id || "",
        },
        validationSchema: taskModal.mode === "edit" ? updateTaskValidationSchema : taskValidationSchema,
        onSubmit: (values) => {
            if (taskModal.mode === "create") {
                createTask.mutate(values, {
                    onSuccess: closeModal,
                });
            } else {
                const dataToSend = {};
                if (values.status !== taskModal.task?.status) {
                    Object.assign(dataToSend, { status: values.status });
                }
                if (values.priority !== taskModal.task?.priority) {
                    Object.assign(dataToSend, { priority: values.priority });
                }
                if (values.dueDate !== taskModal.task?.dueDate?.split("T")[0]) {
                    Object.assign(dataToSend, { dueDate: values.dueDate });
                }
                if (values.title !== taskModal.task?.title) {
                    Object.assign(dataToSend, { title: values.title });
                }
                if (values.description !== taskModal.task?.description) {
                    Object.assign(dataToSend, { description: values.description });
                }
                if (values.assignedToId !== taskModal.task?.assignedToId._id) {
                    Object.assign(dataToSend, { assignedToId: values.assignedToId });
                }
                if (Object.keys(dataToSend).length === 0) {
                    closeModal();
                    return;
                }
                else {
                    updateTask.mutate(
                        {
                            taskId: taskModal.task!._id,
                            data: dataToSend,
                        },
                        { onSuccess: closeModal }
                    );
                }
            }
        },
    });

    if (isLoading) return <FullPageLoader />;
    if (isError) return <p>Failed to fetch tasks</p>;

    return (
        <div className="task-table-container">
            <div className="table-header md:flex-row flex-col">
                <h2 className="table-title">Task Management</h2>



                <div className="flex md:flex-row flex-col gap-5 items-end">
                    <FilterSelect
                        label="Status"
                        value={filters.status}
                        options={Object.values(TaskStatus).map((s) => ({
                            label: s,
                            value: s,
                        }))}
                        onChange={(value) =>
                            setFilters((prev) => ({ ...prev, status: value }))
                        }
                    />

                    <FilterSelect
                        label="Priority"
                        value={filters.priority}
                        options={Object.values(TaskPriority).map((p) => ({
                            label: p,
                            value: p,
                        }))}
                        onChange={(value) =>
                            setFilters((prev) => ({ ...prev, priority: value }))
                        }
                    />


                    <button className="add-task-btn" onClick={handleAdd}>
                        <FiPlus size={18} />
                        <span>Add Task</span>
                    </button>
                </div>
            </div>

            <div className="table-wrapper">
                <table className="task-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Due Date</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Creator</th>
                            <th>Assigned To</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {tasks && tasks?.map((task: Task) => (
                            <tr key={task._id}>
                                <td className="title-cell">{task.title}</td>
                                <td>
                                    {new Date(task.dueDate).toLocaleDateString()}{" "}
                                    {new Date(task.dueDate).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </td>
                                <td>
                                    <span className={`badge priority ${task.priority.toLowerCase()}`}>
                                        {task.priority}
                                    </span>
                                </td>
                                <td>
                                    <span className={`badge status ${task.status.replace(" ", "").toLowerCase()}`}>
                                        {task.status}
                                    </span>
                                </td>
                                <td>{task.creatorId.name}</td>
                                <td>{task.assignedToId.name}</td>
                                <td className="action-cell">
                                    <button
                                        className="action-icon edit"
                                        onClick={() => handleEdit(task)}
                                        aria-label="Edit task"
                                        title="Edit"
                                    >
                                        <FiEdit2 size={16} />
                                    </button>

                                    <button
                                        className={`action-icon delete ${task.creatorId._id !== myId ? "user-select-disabled" : ""}`}
                                        onClick={() => handleDelete(task._id)}
                                        aria-label="Delete task"
                                        title="Delete"
                                        disabled={task.creatorId._id !== myId}
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </td>


                            </tr>
                        ))}

                        {tasks?.length === 0 && (
                            <tr>
                                <td colSpan={7} className="empty">
                                    No tasks available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <CustomModal
                loading={createTask.isPending || updateTask.isPending}
                size="large"
                title={taskModal.mode === "create" ? "Add Task" : "Edit Task"}
                open={taskModal.open}
                onSubmit={() => taskForm.handleSubmit()}
                openHandler={closeModal}
                submitButtonText={
                    taskModal.mode === "create" ? "Create Task" : "Update Task"
                }
                submitButtonLoadingText={
                    taskModal.mode === "create" ? "Creating..." : "Updating..."
                }
            >
                <div className="flex flex-col gap-4">

                    {/* Title */}
                    <div className="form-field">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            disabled={taskModal.mode === "edit" && taskModal.task?.creatorId._id !== myId}
                            className={`form-input ${taskModal.mode === "edit" && taskModal.task?.creatorId._id !== myId ? "user-select-disabled " : ""} ${taskForm.touched.title && taskForm.errors.title
                                ? "input-error"
                                : ""
                                }`}
                            placeholder="Enter task title"
                            {...taskForm.getFieldProps("title")}
                        />
                        {taskForm.touched.title && taskForm.errors.title && (
                            <p className="error-text">{taskForm.errors.title}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="form-field">
                        <label className="form-label">Description</label>
                        <textarea
                            disabled={taskModal.mode === "edit" && taskModal.task?.creatorId._id !== myId}
                            className={`form-textarea ${taskForm.touched.description && taskForm.errors.description
                                ? "input-error"
                                : ""
                                }  ${taskModal.mode === "edit" && taskModal.task?.creatorId._id !== myId ? "user-select-disabled " : ""}`}
                            placeholder="Enter task description"
                            {...taskForm.getFieldProps("description")}
                        />
                        {taskForm.touched.description && taskForm.errors.description && (
                            <p className="error-text">{taskForm.errors.description}</p>
                        )}
                    </div>

                    <div className="flex justify-between w-full gap-4">
                        {/* Assigned User */}
                        <div className="form-field w-1/2">
                            <UserSelectDropdown
                                label="Assign To"
                                value={taskForm.values.assignedToId}
                                onChange={(userId) =>
                                    taskForm.setFieldValue("assignedToId", userId)
                                }
                                disable={taskModal.mode === "edit"}
                            />
                            {taskForm.touched.assignedToId &&
                                taskForm.errors.assignedToId && (
                                    <p className="error-text">
                                        {taskForm.errors.assignedToId}
                                    </p>
                                )}
                        </div>

                        {/* Due Date */}
                        <div className="form-field w-1/2">
                            <label className="form-label">Due Date</label>
                            <input
                                disabled={taskModal.mode === "edit" && taskModal.task?.assignedToId._id === myId}
                                type="date"
                                className={`form-input ${taskForm.touched.dueDate && taskForm.errors.dueDate
                                    ? "input-error"
                                    : ""
                                    } ${taskModal.mode === "edit" && taskModal.task?.assignedToId._id === myId ? "user-select-disabled" : ""}`}
                                {...taskForm.getFieldProps("dueDate")}
                            />
                            {taskForm.touched.dueDate && taskForm.errors.dueDate && (
                                <p className="error-text">{taskForm.errors.dueDate}</p>
                            )}
                        </div>
                    </div>



                    {/* Priority & Status */}
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <SelectDropdown
                                label="Priority"
                                value={taskForm.values.priority}
                                onChange={(value) =>
                                    taskForm.setFieldValue("priority", value)
                                }
                                options={Object.values(TaskPriority).map((p) => ({
                                    label: p,
                                    value: p,
                                }))}
                                disable={taskModal.mode === "edit" && taskModal.task?.creatorId._id !== myId}
                            />
                            {taskForm.touched.priority && taskForm.errors.priority && (
                                <p className="error-text">{taskForm.errors.priority}</p>
                            )}
                        </div>

                        <div className="flex-1">
                            <SelectDropdown
                                disable={taskModal.mode === "edit" && taskModal.task?.assignedToId._id !== myId}
                                label="Status"
                                value={taskForm.values.status}
                                onChange={(value) =>
                                    taskForm.setFieldValue("status", value)
                                }
                                options={Object.values(TaskStatus).map((s) => ({
                                    label: s,
                                    value: s,
                                }))}
                            />
                            {taskForm.touched.status && taskForm.errors.status && (
                                <p className="error-text">{taskForm.errors.status}</p>
                            )}
                        </div>
                    </div>
                </div>
            </CustomModal>

            <CustomModal
                size="small"
                title="Confirm Delete"
                open={deleteModal.open}
                onSubmit={deleteConfirmHandler}
                openHandler={() =>
                    setDeleteModal({
                        open: false,
                        taskId: null,
                    })
                }
                submitButtonText="Delete"
                submitButtonLoadingText="Deleting..."
                loading={deleteTask.isPending}
            >
                <p>Are you sure you want to delete this task?</p>
            </CustomModal>
        </div>
    );
};

export default TaskTable;