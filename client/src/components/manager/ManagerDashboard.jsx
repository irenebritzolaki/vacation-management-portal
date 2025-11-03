import { useState } from "react";
import "./ManagerDashboard.css";
import Header from "../common/Header";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import RequestsTable from "../common/RequestsTable";
import PendingRequestCard from "./PendingRequestCard";

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
  const pendingRequests = requests.filter((req) => req.status === "pending");

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

  const handleAcceptRequest = (requestID) => {
    const updatedRequestsList = requests.map((req) =>
      req.id === requestID ? { ...req, status: "approved" } : req
    );
    setRequests(updatedRequestsList);
  };

  const handleRejectRequest = (requestID) => {
    const updatedRequestsList = requests.map((req) =>
      req.id === requestID ? { ...req, status: "rejected" } : req
    );
    setRequests(updatedRequestsList);
  };

  return (
    <div className="dashboard">
      <Header userName={user.username} onSignOut={onSignout} />

      <main className="dashboard-main">
        <section className="left-panel">
          <div className="users">
            <header className="section-header">
              <h2>Registered users</h2>
              <button onClick={handleCreateUser}>Create user</button>
            </header>

            {showUserForm ? (
              <UserForm
                onSubmit={
                  editingUser ? handleUpdateUser : handleSubmitCreateUser
                }
                onCancel={() => {
                  setEditingUser(null);
                  setShowUserForm(false);
                }}
                mode={editingUser ? "edit" : "create"}
                initialData={editingUser}
              />
            ) : users.length === 0 ? (
              <p>No registered users yet.</p>
            ) : (
              <UsersTable
                users={users}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
              />
            )}
          </div>

          <div className="requests">
            <header className="section-header">
              <h2>Vacation Requests History</h2>
            </header>

            {requests.length === 0 ? (
              <p>No requests yet.</p>
            ) : (
              <RequestsTable
                requests={requests.filter((req) => req.status !== "pending")}
                mode="manager"
              />
            )}
          </div>
        </section>
        <aside className="right-panel">
          <h3>Pending Requests</h3>
          <div className="pending-list">
            {pendingRequests.length === 0 ? (
              <p>No pending requests yet.</p>
            ) : (
              pendingRequests.map((request) => (
                <PendingRequestCard
                  key={request.id}
                  request={request}
                  onAcceptRequest={() => handleAcceptRequest(request.id)}
                  onRejectRequest={() => handleRejectRequest(request.id)}
                />
              ))
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}

export default ManagerDashboard;
