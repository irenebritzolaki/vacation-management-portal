function EmployeeDashboard({ onLogout }) {
  return (
    <>
      <div>
        <h1>Employee Dashboard</h1>
        <button onClick={onLogout}>Log out</button>
      </div>
    </>
  );
}

export default EmployeeDashboard;
