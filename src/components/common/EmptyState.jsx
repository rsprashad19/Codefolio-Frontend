export default function EmptyState({ title = "Nothing here yet" }) {
  return (
    <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
      {title}
    </div>
  );
}
