import { LogOut, RotateCw } from "lucide-react";

function Header({ userName, onSignOut, onReload }) {
  return (
    <header className="dashboard-header">
      <h1>Hello, {userName}</h1>
      <button onClick={onReload}>
        <RotateCw size={15} />
        Reload
      </button>
      <button onClick={onSignOut}>
        <LogOut size={15} />
        Sign Out
      </button>
    </header>
  );
}

export default Header;
