import { useMemo, useState } from "react";

import TaskList from "@/components/tasks/TaskList";
import TaskForm from "@/components/tasks/TaskForm";

import { Button } from "@/components/ui/button";

import { useTasks } from "@/hooks/useTasks";

const CANCELLED_TASK_RETENTION_MS = 24 * 60 * 60 * 1000;
const TASK_FILTER_RENDERED_AT = Date.now();

export default function Tasks() {
  const [open, setOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState(null);
  const [filters, setFilters] = useState({
    project: "all",
    priority: "all",
    status: "all",
  });

  const { tasks, loading, createTask, updateTask, fetchTasks } = useTasks();

  const projectOptions = useMemo(() => {
    const projectsById = new Map();

    tasks.forEach((task) => {
      const projectId = String(
        task.projectId || task.project?.id || task.project?._id || ""
      );

      if (projectId && task.project?.title) {
        projectsById.set(projectId, task.project.title);
      }
    });

    return Array.from(projectsById, ([id, title]) => ({ id, title })).sort(
      (a, b) => a.title.localeCompare(b.title)
    );
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const projectId = String(
        task.projectId || task.project?.id || task.project?._id || ""
      );
      const cancelledAt = new Date(task.updatedAt || task.createdAt).getTime();
      const isOldCancelledTask =
        task.status === "Cancelled" &&
        Number.isFinite(cancelledAt) &&
        TASK_FILTER_RENDERED_AT - cancelledAt > CANCELLED_TASK_RETENTION_MS;

      if (isOldCancelledTask) return false;

      if (filters.project === "no-project" && projectId) return false;
      if (
        filters.project !== "all" &&
        filters.project !== "no-project" &&
        projectId !== filters.project
      ) {
        return false;
      }

      if (filters.priority !== "all" && task.priority !== filters.priority) {
        return false;
      }

      if (filters.status !== "all" && task.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [filters, tasks]);

  const updateFilter = (name, value) => {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleCreate = () => {
    setSelectedTask(null);
    setOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">Tasks</h1>

        <Button onClick={handleCreate}>+ New Task</Button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <select
          value={filters.project}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onChange={(e) => updateFilter("project", e.target.value)}
        >
          <option value="all">All projects</option>
          <option value="no-project">No project</option>

          {projectOptions.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>

        <select
          value={filters.priority}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onChange={(e) => updateFilter("priority", e.target.value)}
        >
          <option value="all">All priorities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={filters.status}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onChange={(e) => updateFilter("status", e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="Open">To Do</option>
          <option value="WorkingInProgress">Working In Progress</option>
          <option value="Completed">Done</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <TaskList
        tasks={filteredTasks}
        loading={loading}
        refresh={fetchTasks}
        onEdit={handleEdit}
      />

      <TaskForm
        open={open}
        setOpen={setOpen}
        selectedTask={selectedTask}
        createTask={createTask}
        updateTask={updateTask}
      />
    </div>
  );
}
