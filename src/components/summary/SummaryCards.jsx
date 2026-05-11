import { Card, CardContent } from "../ui/card";

export default function SummaryCards({ summary }) {
  const stats = [
    {
      title: "Projects",
      value: summary?.totalProjects || 0,
    },
    {
      title: "Open Tasks",
      value: (summary?.totalTasks || 0) - (summary?.completedTasks || 0),
    },
    {
      title: "Total Sessions",
      value: summary?.totalSessions || 0,
    },
    {
      title: "Journal Entries",
      value: summary?.totalJournals || 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => (
        <Card key={item.title}>
          <CardContent className="p-4 flex flex-col justify-center h-full">
            <p className="text-sm text-muted-foreground">{item.title}</p>
            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
