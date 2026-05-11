import { useEffect, useState } from "react";

import * as api from "@/api/tasks.api";

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.getTasks();

      setTasks(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (data) => {
    await api.createTask(data);

    fetchTasks();
  };

  const updateTask = async (id, data) => {
    await api.updateTask(id, data);

    fetchTasks();
  };

  const deleteTask = async (id) => {
    await api.deleteTask(id);

    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}
