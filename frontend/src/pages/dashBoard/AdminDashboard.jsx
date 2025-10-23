import { useState } from "react";
import Courses from "./DCourses";
import Dashboard from "./Dashboard";
import SideBar from "./SideBar";
import Users from "./DUsers";
import { authService } from "../../api/auth.service";


function AdminDashboard() {
  const [current, setCurrent] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAdminAuthenticated());
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const renderContent = () => {
    switch (current) {
      case "dashboard":
        return <Dashboard isAuthenticated = {isAuthenticated} />;
      case "user":
        return <Users />;
      case "courses":
        return <Courses />;
      default:
        return <Dashboard isAuthenticated = {isAuthenticated}/>;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const result = await authService.login(username, password);

    if (result.success && result.user.role === "ROLE_ADMIN") {
      setIsAuthenticated(true);
      setError("");
    } else if (result.success && result.user.role !== "ROLE_ADMIN") {
      setError("You are not authorized as admin.");
    } else {
      setError(result.error || "Invalid username or password");
    }
  };

  return (
    <div className="flex min-h-screen">
      <SideBar current={current} onSelect={setCurrent} />
      <section className="flex-1 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 transition-all duration-300">
        <main className="p-8 font-poppins">{renderContent()}</main>
      </section>

      {!isAuthenticated && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-lg z-50">
          <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/30">
            <h2 className="text-3xl font-extrabold text-center text-white mb-6 drop-shadow">
              Admin Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Email
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-white/30 border border-white/40 rounded-lg text-white placeholder-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/30 border border-white/40 rounded-lg text-white placeholder-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter password"
                  required
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm font-medium">{error}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold text-lg text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all duration-300"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
