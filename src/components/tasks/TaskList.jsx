import TaskCard from "./TaskCard";

import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";

export default function TaskList({ tasks, loading, refresh, onEdit }) {
  if (loading) return <Loader />;

  if (!tasks.length) {
    return <EmptyState title="No Tasks Found" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} refresh={refresh} onEdit={onEdit} />
      ))}
    </div>
  );
}
