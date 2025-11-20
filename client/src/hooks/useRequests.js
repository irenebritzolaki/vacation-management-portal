import { useState } from "react";
import {
  getRequestsByUserID,
  getAllRequests,
  createRequest,
  deleteRequest,
  changeRequestsStatus,
} from "../api";

export function useRequests(userID, mode = "employee") {
  const [requests, setRequests] = useState([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [deletingRequestID, setDeletingRequestID] = useState(null);
  const [showDeleteRequestModal, setShowDeleteRequestModal] = useState(false);

  // Load requests
  const loadRequests = async () => {
    const data =
      mode === "manager"
        ? await getAllRequests()
        : await getRequestsByUserID(userID);
    setRequests(data);
  };

  // Create request
  const handleNewRequest = (e) => {
    e.stopPropagation();
    setShowRequestForm(true);
  };

  const handleSubmitNewRequest = async (newRequestData) => {
    const today = new Date().toISOString().split("T")[0];
    const newRequest = {
      dateSubmitted: today,
      status: "pending",
      userID,
      ...newRequestData,
    };
    const result = await createRequest(newRequest);
    setRequests([result, ...requests]);
    setShowRequestForm(false);
  };

  // Delete request
  const openDeleteRequestModal = (requestID) => {
    setDeletingRequestID(requestID);
    setShowDeleteRequestModal(true);
  };

  const closeDeleteRequestModal = () => {
    setDeletingRequestID(null);
    setShowDeleteRequestModal(false);
  };

  const handleDeleteRequest = async () => {
    await deleteRequest(deletingRequestID);
    setRequests(requests.filter((r) => r.id !== deletingRequestID));
    closeDeleteRequestModal();
  };

  // Approve / reject (manager only)
  const handleApproveRequest = async (requestID) => {
    await changeRequestsStatus(requestID, { status: "approved" });
    loadRequests();
  };

  const handleRejectRequest = async (requestID) => {
    await changeRequestsStatus(requestID, { status: "rejected" });
    loadRequests();
  };

  return {
    requests,
    showRequestForm,
    setShowRequestForm,
    handleNewRequest,
    handleSubmitNewRequest,
    deletingRequestID,
    showDeleteRequestModal,
    openDeleteRequestModal,
    closeDeleteRequestModal,
    handleDeleteRequest,
    handleApproveRequest,
    handleRejectRequest,
    loadRequests,
  };
}
