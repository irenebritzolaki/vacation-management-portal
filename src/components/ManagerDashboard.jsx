function ManagerDashboard({ onLogout }) {
  return (
    <>
      <div>
        <h1>Manager Dashboard</h1>
        <button onClick={onLogout}>Log Out</button>
      </div>
    </>
  );
}

export default ManagerDashboard;
