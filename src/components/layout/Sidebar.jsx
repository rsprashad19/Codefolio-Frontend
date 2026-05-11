import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Clock,
  BookOpen,
  BarChart3,
  User,
  Menu,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Projects", path: "/projects", icon: FolderKanban },
  { name: "Tasks", path: "/tasks", icon: CheckSquare },
  { name: "Sessions", path: "/sessions", icon: Clock },
  { name: "Journal", path: "/journal", icon: BookOpen },
  { name: "Analytics", path: "/summary", icon: BarChart3 },
  { name: "Profile", path: "/profile", icon: User },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className={`h-screen border-r bg-background shadow-sm transition-all duration-300 flex flex-col ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top */}
      <div className="p-4 flex justify-between items-center">
        {!collapsed && <h1 className="text-xl font-bold">CodeFolio</h1>}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={20} />
        </Button>
      </div>

      {/* Menu */}
      <nav className="space-y-2 px-3 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <Link key={item.name} to={item.path}>
              <div
                className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer hover:bg-muted ${
                  active ? "bg-muted font-semibold" : ""
                }`}
              >
                <Icon size={18} />
                {!collapsed && <span>{item.name}</span>}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom controls */}
      <div className="p-4 border-t flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        {!collapsed && (
          <Button variant="outline" className="flex-1" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" />
            Sign Off
          </Button>
        )}
      </div>
    </div>
  );
}
