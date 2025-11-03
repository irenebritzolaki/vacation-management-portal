import { useState, useEffect } from "react";
import { Users, History, Loader } from "lucide-react";
import "./ManagerDashboard.css";
import Header from "../common/Header";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import RequestsTable from "../common/RequestsTable";
import PendingRequestCard from "./PendingRequestCard";
import {
  changeRequestsStatus,
  createUser,
  updateUser,
  deleteUser,
  getAllRequests,
  getAllUsers,
  getRequestsByUserID,
} from "../../api";

function ManagerDashboard({ user, onSignout }) {
  const [users, setUsers] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const pendingRequests = requests.filter((req) => req.status === "pending");

  const handleCreateUser = () => {
    setShowUserForm(true);
  };

  const handleSubmitCreateUser = async (newUserData) => {
    createUser(newUserData).then((savedUser) => {
      setUsers([...users, savedUser]);
      setShowUserForm(false);
    });
  };

  const handleEditUser = (userToEdit) => {
    setEditingUser(userToEdit);
    setShowUserForm(true);
  };

  const handleUpdateUser = async (updatedUser) => {
    updateUser(updatedUser.id, updatedUser).then(() => {
      const updatedUserList = users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      );
      setUsers(updatedUserList);
      setEditingUser(null);
      setShowUserForm(false);
    });
  };

  const handleDeleteUser = async (userID) => {
    const userRequests = await getRequestsByUserID(userID);
    await Promise.all(
      userRequests.map((req) =>
        fetch(`${API_URL}/requests/${req.id}`, {
          method: "DELETE",
        })
      )
    );

    deleteUser(userID).then(() => {
      const updatedUserList = users.filter((u) => u.id !== userID);
      setUsers(updatedUserList);

      const updatedRequests = requests.filter((req) => req.userID !== userID);
      setRequests(updatedRequests);
    });
  };

  const handleApproveRequest = async (requestID) => {
    changeRequestsStatus(requestID, { status: "approved" }).then(() => {
      const updatedRequestsList = requests.map((req) =>
        req.id === requestID ? { ...req, status: "approved" } : req
      );
      setRequests(updatedRequestsList);
    });
  };

  const handleRejectRequest = async (requestID) => {
    changeRequestsStatus(requestID, { status: "rejected" }).then(() => {
      const updatedRequestsList = requests.map((req) =>
        req.id === requestID ? { ...req, status: "rejected" } : req
      );
      setRequests(updatedRequestsList);
    });
  };

  const loadUsers = () => {
    getAllUsers().then((result) => setUsers(result));
  };

  const loadRequests = () => {
    getAllRequests().then((result) => setRequests(result));
  };

  const handleReload = () => {
    loadUsers();
    loadRequests();
  };

  useEffect(() => {
    loadUsers();
    loadRequests();
  }, []);

  return (
    <div className="dashboard">
      <Header
        userName={user.username}
        onSignOut={onSignout}
        onReload={handleReload}
      />

      <main className="dashboard-main">
        <section className="left-panel">
          <div className="users">
            <header className="section-header">
              <Users size={25} />
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
              <History size={25} />
              <h2>Vacation Requests History</h2>
            </header>

            {requests.length === 0 ? (
              <p>No requests yet.</p>
            ) : (
              <RequestsTable
                requests={requests.filter((req) => req.status !== "pending")}
                users={users}
                mode="manager"
              />
            )}
          </div>
        </section>
        <aside className="right-panel">
          <header className="section-header">
            <Loader size={22} />
            <h3>Pending Requests</h3>
          </header>
          <div className="pending-list">
            {pendingRequests.length === 0 ? (
              <p>No pending requests yet.</p>
            ) : (
              pendingRequests.map((request) => (
                <PendingRequestCard
                  key={request.id}
                  users={users}
                  request={request}
                  onApproveRequest={() => handleApproveRequest(request.id)}
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
