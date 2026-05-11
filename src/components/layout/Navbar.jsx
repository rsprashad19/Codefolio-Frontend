export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex justify-end items-center p-4 border-b bg-background">
      <div className="text-right">
        <p className="font-semibold">{user?.name}</p>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
      </div>
    </div>
  );
}
