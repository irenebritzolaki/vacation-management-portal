import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import EmployeeDashboard from "./components/EmployeeDashboard";
import ManagerDashboard from "./components/ManagerDashboard";

function App() {
  const [user, setUser] = useState({ username: "Eirini", role: "employee" });

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return <EmployeeDashboard user={user} onLogout={handleLogout} />;

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return user.role === "manager" ? (
    <ManagerDashboard onLogout={handleLogout} />
  ) : (
    <EmployeeDashboard user={user} onLogout={handleLogout} />
  );
}

export default App;
