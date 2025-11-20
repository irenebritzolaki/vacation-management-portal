import { useState, useEffect } from "react";
import "./Dashboard.css";
import Header from "../common/Header";
import UsersSection from "../sections/UsersSection";
import RequestsSection from "../sections/RequestsSection";
import PendingRequestsSection from "../sections/PendingRequestsSection";
import UserForm from "../forms/UserForm";
import RequestForm from "../forms/RequestForm";
import Modal from "../common/Modal";
import ConfirmationModal from "../common/ConfirmationModal";
import { useRequests } from "../../hooks/useRequests";
import { useUsers } from "../../hooks/useUsers";

export default function ManagerDashboard({ connectedUser, onSignout }) {
  const [connectedUsername, setConnectedUsername] = useState(
    connectedUser.username
  );

  const requestHook = useRequests(connectedUser.id, "manager");
  const userHook = useUsers();

  const pendingRequests = requestHook.requests.filter(
    (req) => req.status === "pending"
  );
  const myRequests = requestHook.requests.filter(
    (req) => req.userID === connectedUser.id
  );

  const handleUpdateUser = async (updatedUser) => {
    await userHook.handleUpdateUser(updatedUser);
    if (connectedUser.id === updatedUser.id) {
      setConnectedUsername(updatedUser.username);
      if (updatedUser.role !== "manager") onSignout();
    }
  };

  const handleDeleteUser = async () => {
    if (connectedUser.id === userHook.deletingUser?.id) {
      await userHook.handleDeleteUser();
      onSignout();
    } else {
      await userHook.handleDeleteUser();
    }
  };

  const handleRefresh = () => {
    userHook.loadUsers();
    requestHook.loadRequests();
  };

  useEffect(() => {
    userHook.loadUsers();
    requestHook.loadRequests();
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
            users={userHook.users}
            onCreateUser={userHook.handleCreateUser}
            onEditUser={userHook.handleEditUser}
            onDeleteUser={userHook.openDeleteUserModal}
          />

          <RequestsSection
            requests={myRequests}
            onNewRequest={requestHook.handleNewRequest}
            onDeleteRequest={requestHook.openDeleteRequestModal}
            mode="personal"
          />

          <RequestsSection
            requests={requestHook.requests.filter(
              (req) => req.status !== "pending"
            )}
            mode="all"
            users={userHook.users}
          />
        </section>

        <PendingRequestsSection
          requests={pendingRequests}
          users={userHook.users}
          onApproveRequest={requestHook.handleApproveRequest}
          onRejectRequest={requestHook.handleRejectRequest}
        />
      </main>
      {/* Modals & Forms*/}
      {userHook.showUserForm && (
        <Modal onClose={() => userHook.setShowUserForm(false)}>
          <UserForm
            mode={userHook.editingUser ? "edit" : "create"}
            initialData={userHook.editingUser}
            onCancel={() => userHook.setShowUserForm(false)}
            onSubmit={
              userHook.editingUser
                ? handleUpdateUser
                : userHook.handleSubmitCreateUser
            }
          />
        </Modal>
      )}

      {requestHook.showRequestForm && (
        <Modal onClose={() => requestHook.setShowRequestForm(false)}>
          <RequestForm
            onCancel={() => requestHook.setShowRequestForm(false)}
            onSubmit={requestHook.handleSubmitNewRequest}
          />
        </Modal>
      )}

      {requestHook.showDeleteRequestModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this request?"
          onConfirm={requestHook.handleDeleteRequest}
          onCancel={requestHook.closeDeleteRequestModal}
        />
      )}

      {userHook.showDeleteUserModal && (
        <ConfirmationModal
          message={`Are you sure you want to delete user ${userHook.deletingUser?.username}?`}
          onConfirm={handleDeleteUser}
          onCancel={userHook.closeDeleteUserModal}
        />
      )}
    </div>
  );
}
