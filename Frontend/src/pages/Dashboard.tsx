import { useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import { socket } from "../socket";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { data: tasks = [], isLoading } = useTasks();
  const queryClient = useQueryClient();

  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    socket.on("task:update", () =>
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    );

    socket.on("task:assigned", () => {
      alert("A task was assigned to you");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    });

    return () => {
      socket.off("task:update");
      socket.off("task:assigned");
    };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await api.put(`/task/update-task/${id}`, { status });
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  const deleteTask = async (id: string) => {
    await api.delete(`/task/delete-task/${id}`);
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  if (isLoading) return <p className="p-6">Loading...</p>;

  const filteredTasks = tasks.filter((t: any) => {
    return (
      (!statusFilter || t.status === statusFilter) &&
      (!priorityFilter || t.priority === priorityFilter)
    );
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <Link
          to="/create-task"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Task
        </Link>
      </div>

      <div className="flex gap-4 mb-4">
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option>To Do</option>
          <option>In Progress</option>
          <option>Review</option>
          <option>Completed</option>
        </select>

        <select onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="">All Priority</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Urgent</option>
        </select>
      </div>

      {filteredTasks.map((task: any) => (
        <div key={task._id} className="border p-4 rounded mb-3">
          <h2 className="font-semibold">{task.title}</h2>
          <p className="text-sm">{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}</p>
          <p className="text-sm text-gray-500">
            Assigned to: {task.assignedToId?.name}
          </p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => updateStatus(task._id, "Completed")}
              className="bg-green-600 text-white px-2 py-1 rounded"
            >
              Complete
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
