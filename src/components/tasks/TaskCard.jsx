import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { MoreVertical } from "lucide-react";

import { deleteTask } from "@/api/tasks.api";
import { cn } from "@/lib/utils";

const formatStatus = (status) => {
  if (status === "Open") return "To Do";
  if (status === "WorkingInProgress") return "In Progress";
  if (status === "Completed") return "Done";

  return status;
};

const statusStyles = {
  Open: "border-slate-300/30 bg-slate-500/10 text-slate-700 dark:text-slate-300",
  WorkingInProgress:
    "border-blue-400/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  Completed:
    "border-emerald-400/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Cancelled: "border-red-400/30 bg-red-500/10 text-red-700 dark:text-red-300",
};

const priorityStyles = {
  Critical: "border-red-400/30 bg-red-500/10 text-red-700 dark:text-red-300",
  High: "border-amber-400/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Medium: "border-blue-400/30 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  Low: "border-emerald-400/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
};

const badgeClass =
  "inline-flex h-6 items-center border px-2 text-xs font-semibold";

// Task card component with edit and delete options
export default function TaskCard({ task, refresh, onEdit }) {
  const isDisabled = task.status === "Completed" || task.status === "Cancelled";

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);

      refresh();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <Card
      className={cn(
        "relative group min-h-44 border border-blue-500/70 shadow-md",
        isDisabled && "opacity-60 grayscale",
      )}
      aria-disabled={isDisabled}
    >
      {/* Hover Options */}
      {!isDisabled && (
        <div className="absolute top-3 right-3 opacity-0 transition group-hover:opacity-100">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(task)}>
                Edit
              </DropdownMenuItem>

              {/* Delete Popup */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-red-500"
                    onSelect={(e) => e.preventDefault()}
                  >
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Task?</AlertDialogTitle>

                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction onClick={handleDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      <CardContent className="flex h-full min-h-36 flex-col p-4">
        <h2
          className={cn(
            "text-lg font-semibold",
            isDisabled && "line-through decoration-2",
          )}
        >
          {task.title}
        </h2>

        <p className="mt-4 text-sm text-muted-foreground">
          {task.details || "No description"}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className={cn(badgeClass, statusStyles[task.status])}>
            {formatStatus(task.status)}
          </span>

          <span className={cn(badgeClass, priorityStyles[task.priority])}>
            {task.priority}
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5 text-xs text-muted-foreground">
          <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>

          <span className="font-semibold text-black dark:text-white">
            {task.project?.title || "No Project"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
