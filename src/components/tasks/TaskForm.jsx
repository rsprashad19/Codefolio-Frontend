import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useProjects } from "@/hooks/useProjects";

const normalizeStatus = (status) => {
  if (status === "Working in progress") return "WorkingInProgress";

  return status || "Open";
};

// Task form component for creating and editing tasks
export default function TaskForm({
  open,
  setOpen,
  selectedTask,
  createTask,
  updateTask,
}) {
  const { projects } = useProjects();

  const [form, setForm] = useState({
    projectId: "",
    title: "",
    details: "",
    status: "Open",
    priority: "Medium",
  });

  useEffect(() => {
    if (selectedTask) {
      setForm({
        projectId:
          selectedTask.projectId ||
          selectedTask.project?.id ||
          selectedTask.project?._id ||
          "",

        title: selectedTask.title || "",

        details: selectedTask.details || "",

        status: normalizeStatus(selectedTask.status),

        priority: selectedTask.priority || "Medium",
      });
    } else {
      setForm({
        projectId: "",
        title: "",
        details: "",
        status: "Open",
        priority: "Medium",
      });
    }
  }, [selectedTask]);

  const handleSubmit = async () => {
    if (!form.title) {
      return alert("Title required");
    }

    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, form);
      } else {
        await createTask(form);
      }

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[#0b1220] text-white">
        <DialogHeader>
          <DialogTitle>
            {selectedTask ? "Edit Task" : "Create Task"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Project Dropdown */}
          <select
            value={form.projectId}
            className="w-full p-2 bg-black border rounded"
            onChange={(e) =>
              setForm({
                ...form,
                projectId: e.target.value,
              })
            }
          >
            <option value="">None of the above</option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>

          {/* Title */}
          <Input
            value={form.title}
            placeholder="Task Title"
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          {/* Description */}
          <Input
            value={form.details}
            placeholder="Description"
            onChange={(e) =>
              setForm({
                ...form,
                details: e.target.value,
              })
            }
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Status */}
            <select
              value={form.status}
              className="w-full p-2 bg-black border rounded"
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
            >
              <option value="Open">Open</option>

              <option value="WorkingInProgress">Working In Progress</option>

              <option value="Completed">Completed</option>

              <option value="Cancelled">Cancelled</option>
            </select>

            {/* Priority */}
            <select
              value={form.priority}
              className="w-full p-2 bg-black border rounded"
              onChange={(e) =>
                setForm({
                  ...form,
                  priority: e.target.value,
                })
              }
            >
              <option value="Critical">Critical</option>

              <option value="High">High</option>

              <option value="Medium">Medium</option>

              <option value="Low">Low</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleSubmit}>
              {selectedTask ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
