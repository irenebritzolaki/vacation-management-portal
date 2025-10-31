import { useState } from "react";

const mockUsers = [
  {
    id: 1,
    username: "user1",
    email: "user1@domain.com",
    password: "123456",
    employeeID: 7654321,
  },
  {
    id: 2,
    username: "user2",
    email: "user2@domain.com",
    password: "dfhgjh1",
    employeeID: 1234567,
  },
  {
    id: 3,
    username: "user3",
    email: "user3@domain.com",
    password: "qwerty",
    employeeID: 2255334,
  },
  {
    id: 4,
    username: "user4",
    email: "user4@domain.com",
    password: "pa$$word",
    employeeID: 2883112,
  },
];

function UserRow({ user }) {
  return (
    <tr>
      <td>{user.employeeID}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
    </tr>
  );
}

function ManagerDashboard({ user, onLogout }) {
  const [users, setUsers] = useState(mockUsers);

  return (
    <div className="dashboard">
      <button onClick={onLogout}>Logout</button>
      <h1>Hello, {user.username}</h1>
      <div>
        <h2>Registered users</h2>

        {users.length === 0 ? (
          <p>No registered users yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>employee_id</th>
                <th>username</th>
                <th>email</th>
                <th>password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <UserRow key={u.id} user={u} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ManagerDashboard;
