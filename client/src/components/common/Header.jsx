function Header({ userName, onSignOut, onReload }) {
  return (
    <header className="dashboard-header">
      <h1>Hello, {userName}</h1>
      <button onClick={onReload}>Reload</button>
      <button onClick={onSignOut}>Sign Out</button>
    </header>
  );
}

export default Header;
