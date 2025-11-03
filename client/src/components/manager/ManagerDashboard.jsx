import { useState, useEffect } from "react";
import "./ManagerDashboard.css";
import Header from "../common/Header";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import RequestsTable from "../common/RequestsTable";
import PendingRequestCard from "./PendingRequestCard";

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
    const newUser = {
      // id: Date.now(),
      ...newUserData,
    };

    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error("Failed to create new user");

      const savedUser = await res.json();

      setUsers([...users, savedUser]);
      setShowUserForm(false);
    } catch (error) {
      console.error("Error creating new user:", error);
    }
  };

  const handleEditUser = (userToEdit) => {
    setEditingUser(userToEdit);
    setShowUserForm(true);
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${updatedUser.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) throw new Error("Failed to update user");

      const updatedUserList = users.map((u) =>
        u.id === updatedUser.id ? updatedUser : u
      );
      setUsers(updatedUserList);
      setEditingUser(null);
      setShowUserForm(false);
    } catch (error) {
      console.error("Error creating new user:", error);
    }
  };

  const handleDeleteUser = async (userID) => {
    try {
      // first delete the associated data
      const res = await fetch(
        `http://localhost:3000/requests?userID=${userID}`
      );
      const userRequests = await res.json();

      await Promise.all(
        userRequests.map((req) =>
          fetch(`http://localhost:3000/requests/${req.id}`, {
            method: "DELETE",
          })
        )
      );

      await fetch(`http://localhost:3000/users/${userID}`, {
        method: "DELETE",
      });

      const updatedUserList = users.filter((u) => u.id !== userID);
      setUsers(updatedUserList);

      const updatedRequests = requests.filter((req) => req.userID !== userID);
      setRequests(updatedRequests);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleAcceptRequest = async (requestID) => {
    try {
      const res = await fetch(`http://localhost:3000/requests/${requestID}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "approved" }),
      });

      if (!res.ok) throw new Error("Failed to approve request");

      const updatedRequestsList = requests.map((req) =>
        req.id === requestID ? { ...req, status: "approved" } : req
      );
      setRequests(updatedRequestsList);
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleRejectRequest = async (requestID) => {
    try {
      const res = await fetch(`http://localhost:3000/requests/${requestID}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "rejected" }),
      });

      if (!res.ok) throw new Error("Failed to reject request");

      const updatedRequestsList = requests.map((req) =>
        req.id === requestID ? { ...req, status: "rejected" } : req
      );
      setRequests(updatedRequestsList);
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const getUsers = () => {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://localhost:3000/users", requestOptions)
      .then((response) => response.json())
      .then((result) => setUsers(result))
      .catch((error) => console.log("error on getUsers", error));
  };

  const getRequests = () => {
    var requestOptions = {
      method: "GET",
    };

    fetch("http://localhost:3000/requests", requestOptions)
      .then((response) => response.json())
      .then((result) => setRequests(result))
      .catch((error) => console.log("error on getRequests", error));
  };

  const handleReload = () => {
    getUsers();
    getRequests();
  };

  useEffect(() => {
    getUsers();
    getRequests();
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
