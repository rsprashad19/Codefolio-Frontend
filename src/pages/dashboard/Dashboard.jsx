import { useEffect, useState } from "react";
import SummaryCards from "../../components/summary/SummaryCards";
import { getOverallSummary } from "../../api/summary.api";

export default function Dashboard() {
  const storedUser = localStorage.getItem("user");
  const user =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const data = await getOverallSummary();
      setSummary(data);
    } catch (error) {
      console.error("Failed to fetch summary", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-background min-h-full">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name || "User"}!
        </h1>
        <p className="text-muted-foreground">
          Here's your productivity overview
        </p>
      </div>

      {loading ? <p>Loading summary...</p> : <SummaryCards summary={summary} />}
    </div>
  );
}
