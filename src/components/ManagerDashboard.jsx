import { useState } from "react";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";

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

function ManagerDashboard({ user, onLogout }) {
  const [users, setUsers] = useState(mockUsers);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

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
      <button onClick={onLogout}>Logout</button>
      <h1>Hello, {user.username}</h1>

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
    </div>
  );
}

export default ManagerDashboard;
