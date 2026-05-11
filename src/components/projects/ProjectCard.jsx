import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
import { deleteProject } from "@/api/projects.api";

const formatStatus = (status) => {
  if (status === "WorkInProgress") return "Work in progress";
  return status;
};

export default function ProjectCard({ project, refresh, onEdit }) {
  const handleDelete = async () => {
    try {
      await deleteProject(project.id);
      refresh();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <Card className="relative group shadow-md rounded-2xl">
      {/* Hover Options */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical size={18} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(project)}>
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
                  <AlertDialogTitle>Delete Project?</AlertDialogTitle>

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

      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p>{project.description}</p>

        <p>
          <strong>Tech Stack:</strong> {project.techStack.join(", ")}
        </p>

        <p>
          <strong>Status:</strong> {formatStatus(project.status)}
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
