import { useState } from "react";
import "./App.css";
import SignInPage from "./components/pages/SignInPage";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import ManagerDashboard from "./components/manager/ManagerDashboard";

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
    <ManagerDashboard user={user} onSignout={handleSignOut} />
  ) : (
    <EmployeeDashboard user={user} onSignout={handleSignOut} />
  );
}

export default App;
