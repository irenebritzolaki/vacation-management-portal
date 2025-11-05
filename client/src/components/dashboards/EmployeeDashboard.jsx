import "./Dashboard.css";
import Header from "../common/Header";
import RequestForm from "../forms/RequestForm";
import RequestsSection from "../sections/RequestsSection";
import Modal from "../common/Modal";
import ConfirmationModal from "../common/ConfirmationModal";
import { useRequests } from "../../hooks/useRequests";

function EmployeeDashboard({ connectedUser, onSignout }) {
  const requestHook = useRequests(connectedUser.id); // isManager defaults to false

  const handleRefresh = () => {
    requestHook.loadRequests();
  };

  return (
    <div className="dashboard">
      <Header
        username={connectedUser.username}
        onSignOut={onSignout}
        onRefresh={handleRefresh}
      />
      <div className="dashboard-main">
        <RequestsSection
          requests={requestHook.requests}
          onNewRequest={requestHook.handleNewRequest}
          onDeleteRequest={requestHook.openDeleteRequestModal}
          mode="personal"
        />
      </div>

      <Modal
        isOpen={requestHook.showRequestForm}
        onClose={() => requestHook.setShowRequestForm(false)}
      >
        <RequestForm
          onCancel={() => requestHook.setShowRequestForm(false)}
          onSubmit={requestHook.handleSubmitNewRequest}
        />
      </Modal>

      <ConfirmationModal
        isOpen={requestHook.showDeleteRequestModal}
        message="Are you sure you want to delete this request?"
        onConfirm={requestHook.handleDeleteRequest}
        onCancel={requestHook.closeDeleteRequestModal}
      />
    </div>
  );
}

export default EmployeeDashboard;
