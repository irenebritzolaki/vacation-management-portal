import { useState, useEffect } from "react";
import NewRequestForm from "./NewRequestForm";
import RequestsSection from "../manager/RequestsSection";
import Header from "../common/Header";
import Modal from "../common/Modal";
import ConfirmationModal from "../common/ConfirmationModal";
import { getRequestsByUserID, createRequest, deleteRequest } from "../../api";

function EmployeeDashboard({ user, onSignout }) {
  const [requests, setRequests] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [deletingRequestID, setDeletingRequestID] = useState(null);
  const [showDeleteRequestModal, setShowDeleteRequestModal] = useState(false);

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

  const loadRequests = async () => {
    getRequestsByUserID(user.id).then((result) => setRequests(result));
  };

  const handleRefresh = () => {
    loadRequests();
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div className="dashboard">
      <Header
        userName={user.username}
        onSignOut={onSignout}
        onRefresh={handleRefresh}
      />
      <div className="dashboard-main">
        <RequestsSection
          requests={requests}
          onNewRequest={handleNewRequest}
          onDeleteRequest={openDeleteRequestModal}
          mode="personal"
        />
      </div>

      <Modal isOpen={showRequestForm}>
        <NewRequestForm
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
    </div>
  );
}

export default EmployeeDashboard;
