import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { useUsers } from "../hooks/useUsers";

const taskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().optional(),
  assignedToId: z.string().min(1),
  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
});

type TaskForm = z.infer<typeof taskSchema>;

const CreateTask = () => {
  const queryClient = useQueryClient();
  const { data: users = [] } = useUsers();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: { priority: "Medium" },
  });

  const onSubmit = async (data: TaskForm) => {
    await api.post("/task/create-task", {
      ...data,
      dueDate: new Date(),
    });

    queryClient.invalidateQueries({ queryKey: ["tasks"] });
    alert("Task created successfully");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Create Task</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title")}
          placeholder="Task title"
          className="border w-full px-3 py-2"
        />
        {errors.title && <p className="text-red-500">Title required</p>}

        <textarea
          {...register("description")}
          placeholder="Description"
          className="border w-full px-3 py-2"
        />

        <select {...register("assignedToId")} className="border w-full px-3 py-2">
          <option value="">Assign to user</option>
          {users.map((u: any) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        <select {...register("priority")} className="border w-full px-3 py-2">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Urgent</option>
        </select>

        <button
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isSubmitting ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
