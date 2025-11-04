import { useState } from "react";
import "./App.css";
import SignInPage from "./components/pages/SignInPage";
import EmployeeDashboard from "./components/dashboards/EmployeeDashboard";
import ManagerDashboard from "./components/dashboards/ManagerDashboard";

function App() {
  const [user, setUser] = useState(false);

  const handleSignIn = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  if (!user) {
    return <SignInPage onSignIn={handleSignIn} />;
  }

  return user.role === "manager" ? (
    <ManagerDashboard connectedUser={user} onSignout={handleSignOut} />
  ) : (
    <EmployeeDashboard connectedUser={user} onSignout={handleSignOut} />
  );
}

export default App;
