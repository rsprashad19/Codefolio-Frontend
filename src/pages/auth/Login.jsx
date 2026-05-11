import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../api/auth.api";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Login() {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes
  const { login } = useAuth(); // Custom hook to access authentication context

  // Form state to hold email and password
  const [form, setForm] = useState({
    // Initial form state
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    // Function to handle form submission
    e.preventDefault();

    console.log("Sending login payload:", form);

    try {
      const res = await loginUser(form); // API call to login the user with the form data
      console.log("Login API response:", res);

      login(res.access_token); // Update authentication context with the received access token

      localStorage.setItem("token", res.access_token);

      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      }

      navigate("/dashboard");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    // JSX for the login form
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <Card className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-6">
          Login to CodeFolio
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button className="w-full p-5 rounded-lg bg-white text-black font-semibold">
            Login
          </Button>
        </form>

        <p className="text-gray-400 mt-4">
          New user?{" "}
          <Link to="/register" className="text-white">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}
