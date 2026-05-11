import ProjectCard from "./ProjectCard";

export default function ProjectList({ projects = [], refresh, onEdit }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No projects found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          refresh={refresh}
          onEdit={onEdit} // ✅ PASS DOWN
        />
      ))}
    </div>
  );
}
