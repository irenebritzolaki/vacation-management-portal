import { useState, useEffect } from "react";
import { History } from "lucide-react";
import NewRequestForm from "./NewRequestForm";
import RequestsTable from "../common/RequestsTable";
import Header from "../common/Header";
import { getRequestsByUserID, createRequest, deleteRequest } from "../../api";

function EmployeeDashboard({ user, onSignout }) {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleNewRequest = () => {
    setShowForm(true);
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
      setShowForm(false);
    });
  };

  const handleDeleteRequest = async (requestID) => {
    deleteRequest(requestID).then(() => {
      const updatedRequests = requests.filter((req) => req.id !== requestID);
      setRequests(updatedRequests);
    });
  };

  const loadRequests = async () => {
    getRequestsByUserID(user.id).then((result) => setRequests(result));
  };

  const handleReload = () => {
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
        onReload={handleReload}
      />
      <div className="dashboard-main">
        {showForm ? (
          <NewRequestForm
            onCancel={() => setShowForm(false)}
            onSubmit={handleSubmitNewRequest}
          />
        ) : (
          <section className="requests">
            <header className="section-header">
              <History />
              <h2>Your Vacation Requests</h2>
            </header>
            <button onClick={handleNewRequest}>New Request</button>

            {requests.length === 0 ? (
              <p>No requests submitted yet.</p>
            ) : (
              <RequestsTable
                requests={requests}
                onDeleteRequest={handleDeleteRequest}
                mode="employee"
              />
            )}
          </section>
        )}
      </div>
    </div>
  );
}

export default EmployeeDashboard;
