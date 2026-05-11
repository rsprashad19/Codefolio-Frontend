import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import {
  createProject,
  updateProject, // ✅ ADD THIS API
} from "@/api/projects.api";

export default function ProjectForm({ open, setOpen, refresh, project }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    techStack: "",
    status: "Open",
  });

  const fieldClassName = cn(
    "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground",
    "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
  );

  // ✅ Prefill when editing
  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || "",
        description: project.description || "",
        techStack: project.techStack || "",
        status: project.status || "Open",
      });
    } else {
      setForm({
        title: "",
        description: "",
        techStack: "",
        status: "Open",
      });
    }
  }, [project]);

  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        techStack: form.techStack.split(",").map((t) => t.trim()),
      };
      if (project) {
        // ✅ UPDATE
        await updateProject(project.id, payload);
      } else {
        // ✅ CREATE
        await createProject(payload);
      }

      refresh();
      setOpen(false);
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {project ? "Edit Project" : "Create Project"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Project Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className={cn(fieldClassName, "min-h-32 resize-y")}
            rows="4"
            placeholder="Project Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <Input
            placeholder="Tech Stack"
            value={form.techStack}
            onChange={(e) => setForm({ ...form, techStack: e.target.value })}
          />

          <select
            className={cn(fieldClassName, "h-10")}
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="Open">Open</option>
            <option value="WorkInProgress">Work in progress</option>
            <option value="Close">Close</option>
          </select>

          <div className="flex gap-3">
            <Button
              className="flex-1"
              variant="outline"
              type="button"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button className="flex-1" type="button" onClick={handleSubmit}>
              {project ? "Save" : "Create Project"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
