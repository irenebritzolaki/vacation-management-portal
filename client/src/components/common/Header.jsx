import { LogOut, RotateCw } from "lucide-react";
import "./Header.css";

function Header({ username, onSignOut, onRefresh }) {
  return (
    <header className="dashboard-header">
      <h1>Hello, {username}</h1>
      <button className="dashboard-btn refresh-btn" onClick={onRefresh}>
        <RotateCw size={15} />
        Refresh
      </button>
      <button className="dashboard-btn signout-btn" onClick={onSignOut}>
        <LogOut size={15} />
        Sign Out
      </button>
    </header>
  );
}

export default Header;
