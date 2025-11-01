import { useState } from "react";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import RequestsTable from "../common/RequestsTable";
import Header from "../common/Header";

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

const mockRequests = [
  {
    id: 1,
    dateSubmitted: "2025-10-30",
    startDate: "2025-12-01",
    endDate: "2025-12-05",
    reason: "vacation",
    status: "pending",
    employee: "user1",
  },
  {
    id: 2,
    dateSubmitted: "2025-10-28",
    startDate: "2025-11-10",
    endDate: "2025-11-12",
    reason: "rest",
    status: "approved",
    employee: "user2",
  },
  {
    id: 3,
    dateSubmitted: "2025-10-30",
    startDate: "2025-11-10",
    endDate: "2025-11-12",
    reason: "just because",
    status: "rejected",
    employee: "user2",
  },
];

function ManagerDashboard({ user, onSignout }) {
  const [users, setUsers] = useState(mockUsers);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [requests, setRequests] = useState(mockRequests);

  const handleCreateUser = () => {
    setShowUserForm(true);
  };

  const handleSubmitCreateUser = (newUserData) => {
    const newUser = {
      id: Date.now(),
      ...newUserData,
    };

    setUsers([...users, newUser]);
    setShowUserForm(false);
  };

  const handleEditUser = (userToEdit) => {
    setEditingUser(userToEdit);
    setShowUserForm(true);
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUserList = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    setUsers(updatedUserList);
    setEditingUser(null);
    setShowUserForm(false);
  };

  const handleDeleteUser = (userID) => {
    const updatedUserList = users.filter((u) => u.id !== userID);
    setUsers(updatedUserList);
    // todo: delete associated data
  };

  return (
    <div className="dashboard">
      <Header userName={user.username} onSignOut={onSignout} />
      <div className="container">
        {showUserForm ? (
          <UserForm
            onSubmit={editingUser ? handleUpdateUser : handleSubmitCreateUser}
            onCancel={() => {
              setEditingUser(null);
              setShowUserForm(false);
            }}
            mode={editingUser ? "edit" : "create"}
            initialData={editingUser}
          />
        ) : (
          <div>
            <h2>Registered users</h2>
            <button onClick={handleCreateUser}>Create user</button>

            {users.length === 0 ? (
              <p>No registered users yet.</p>
            ) : (
              <UsersTable
                users={users}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
              />
            )}
          </div>
        )}
        <div>
          <h2>Vacation Requests History</h2>

          {requests.length === 0 ? (
            <p>No requests yet.</p>
          ) : (
            <RequestsTable
              requests={requests.filter((req) => req.status !== "pending")}
              mode="manager"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
