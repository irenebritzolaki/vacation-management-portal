function Header({ userName, onSignOut }) {
  return (
    <header className="dashboard-header">
      <h1>Hello, {userName}</h1>
      <button onClick={onSignOut}>Sign Out</button>
    </header>
  );
}

export default Header;
