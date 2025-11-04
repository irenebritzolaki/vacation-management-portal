import { useState, useEffect } from "react";
import "./ManagerDashboard.css";
import Header from "../common/Header";
import UserForm from "./UserForm";
import NewRequestForm from "../employee/NewRequestForm";
import Modal from "../common/Modal";
import {
  changeRequestsStatus,
  createUser,
  updateUser,
  deleteUser,
  getAllRequests,
  getAllUsers,
  getRequestsByUserID,
  deleteRequest,
  createRequest,
} from "../../api";
import UsersSection from "./UsersSection";
import RequestsSection from "./RequestsSection";
import PendingRequestsSection from "./PendingRequestsSection";

function ManagerDashboard({ user, onSignout }) {
  const [users, setUsers] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [requests, setRequests] = useState([]);

  const pendingRequests = requests.filter((req) => req.status === "pending");
  const myRequests = requests.filter((req) => req.userID === user.id);

  const handleCreateUser = (e) => {
    e.stopPropagation();
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
    await Promise.all(userRequests.map((req) => deleteRequest(req.id)));

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

  const handleNewRequest = (e) => {
    e.stopPropagation();
    setShowRequestForm(true);
  };

  const handleSubmitNewRequest = async (newRequestData) => {
    const today = new Date().toISOString().split("T")[0];
    const newRequest = {
      dateSubmitted: today,
      status: "pending",
      userID: user.id,
      ...newRequestData,
    };

    createRequest(newRequest).then((result) => {
      setRequests([...requests, result]);
      setShowRequestForm(false);
    });
  };

  const handleDeleteRequest = async (requestID) => {
    deleteRequest(requestID).then(() => {
      const updatedRequests = requests.filter((req) => req.id !== requestID);
      setRequests(updatedRequests);
    });
  };

  const loadUsers = () => {
    getAllUsers().then((result) => setUsers(result));
  };

  const loadRequests = () => {
    getAllRequests().then((result) => setRequests(result));
  };

  const handleRefresh = () => {
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
        onRefresh={handleRefresh}
      />

      <main className="dashboard-main">
        <section className="left-panel">
          <UsersSection
            users={users}
            onCreateUser={handleCreateUser}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />

          <RequestsSection
            requests={myRequests}
            onNewRequest={handleNewRequest}
            onDeleteRequest={handleDeleteRequest}
            mode="personal"
          />

          <RequestsSection requests={requests} mode="all" users={users} />
        </section>

        <PendingRequestsSection
          requests={pendingRequests}
          users={users}
          onApproveRequest={handleApproveRequest}
          onRejectRequest={handleRejectRequest}
        />
      </main>

      <Modal isOpen={showUserForm}>
        <UserForm
          onSubmit={editingUser ? handleUpdateUser : handleSubmitCreateUser}
          onCancel={() => {
            setEditingUser(null);
            setShowUserForm(false);
          }}
          mode={editingUser ? "edit" : "create"}
          initialData={editingUser}
        />
      </Modal>

      <Modal isOpen={showRequestForm}>
        <NewRequestForm
          onCancel={() => setShowRequestForm(false)}
          onSubmit={handleSubmitNewRequest}
        />
      </Modal>
    </div>
  );
}

export default ManagerDashboard;
