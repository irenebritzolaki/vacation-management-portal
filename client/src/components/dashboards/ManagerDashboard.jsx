import { useState, useEffect } from "react";
import "./Dashboard.css";
import Header from "../common/Header";
import UserForm from "../forms/UserForm";
import RequestForm from "../forms/RequestForm";
import Modal from "../common/Modal";
import ConfirmationModal from "../common/ConfirmationModal";
import UsersSection from "../sections/UsersSection";
import RequestsSection from "../sections/RequestsSection";
import PendingRequestsSection from "../sections/PendingRequestsSection";
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

function ManagerDashboard({ connectedUser, onSignout }) {
  const [users, setUsers] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [deletingRequestID, setDeletingRequestID] = useState(null);
  const [showDeleteRequestModal, setShowDeleteRequestModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  const pendingRequests = requests.filter((req) => req.status === "pending");
  const myRequests = requests.filter((req) => req.userID === connectedUser.id);
  const [connectedUsername, setConnectedUsername] = useState(
    connectedUser.username
  );

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

      if (connectedUser.id === updatedUser.id) {
        setConnectedUsername(updatedUser.username);
        if (updatedUser.role !== "manager") onSignout();
      }

      setUsers(updatedUserList);
      setEditingUser(null);
      setShowUserForm(false);
    });
  };

  const openDeleteUserModal = (user) => {
    setDeletingUser(user);
    setShowDeleteUserModal(true);
  };

  const closeDeleteUserModal = () => {
    setDeletingUser(null);
    setShowDeleteUserModal(false);
  };

  const handleDeleteUser = async () => {
    const userID = deletingUser.id;
    const userRequests = await getRequestsByUserID(userID);
    await Promise.all(userRequests.map((req) => deleteRequest(req.id)));

    deleteUser(userID).then(() => {
      const updatedUserList = users.filter((u) => u.id !== userID);
      setUsers(updatedUserList);

      const updatedRequests = requests.filter((req) => req.userID !== userID);
      setRequests(updatedRequests);

      if (connectedUser.id === userID) {
        onSignout();
      }
      closeDeleteUserModal();
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
      userID: connectedUser.id,
      ...newRequestData,
    };

    createRequest(newRequest).then((result) => {
      setRequests([...requests, result]);
      setShowRequestForm(false);
    });
  };

  const openDeleteRequestModal = (requestID) => {
    setDeletingRequestID(requestID);
    setShowDeleteRequestModal(true);
  };

  const closeDeleteRequestModal = () => {
    setDeletingRequestID(null);
    setShowDeleteRequestModal(false);
  };

  const handleDeleteRequest = async () => {
    deleteRequest(deletingRequestID).then(() => {
      const updatedRequests = requests.filter(
        (req) => req.id !== deletingRequestID
      );
      setRequests(updatedRequests);
      closeDeleteRequestModal();
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
        username={connectedUsername}
        onSignOut={onSignout}
        onRefresh={handleRefresh}
      />

      <main className="dashboard-main">
        <section className="left-panel">
          <UsersSection
            users={users}
            onCreateUser={handleCreateUser}
            onEditUser={handleEditUser}
            onDeleteUser={openDeleteUserModal}
          />

          <RequestsSection
            requests={myRequests}
            onNewRequest={handleNewRequest}
            onDeleteRequest={openDeleteRequestModal}
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
        <RequestForm
          onCancel={() => setShowRequestForm(false)}
          onSubmit={handleSubmitNewRequest}
        />
      </Modal>

      <ConfirmationModal
        isOpen={showDeleteRequestModal}
        message="Are you sure you want to delete this request?"
        onConfirm={handleDeleteRequest}
        onCancel={closeDeleteRequestModal}
      />

      <ConfirmationModal
        isOpen={showDeleteUserModal}
        message={`Are you sure you want to delete user ${
          deletingUser && deletingUser.username
        }?`}
        onConfirm={handleDeleteUser}
        onCancel={closeDeleteUserModal}
      />
    </div>
  );
}

export default ManagerDashboard;
