import { useState, useEffect } from "react";
import { History } from "lucide-react";
import NewRequestForm from "./NewRequestForm";
import RequestsTable from "../common/RequestsTable";
import Header from "../common/Header";

function EmployeeDashboard({ user, onSignout }) {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleNewRequest = () => {
    setShowForm(true);
  };

  const handleSubmitNewRequest = async (newRequestData) => {
    const today = new Date().toISOString().split("T")[0];
    const newRequest = {
      // id: Date.now(), // let server give its own ids
      dateSubmitted: today,
      status: "pending",
      employeeID: user.employeeID,
      ...newRequestData,
    };

    try {
      const res = await fetch("http://localhost:3000/requests", {
        method: "POST",
        body: JSON.stringify(newRequest),
      });

      if (!res.ok) throw new Error("Failed to submit request");

      const savedRequest = await res.json();
      setRequests([...requests, savedRequest]);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  const handleDeleteRequest = async (requestID) => {
    try {
      const res = await fetch(`http://localhost:3000/requests/${requestID}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete request");

      const updatedRequests = requests.filter((req) => req.id !== requestID);
      setRequests(updatedRequests);
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  const getRequests = () => {
    var requestOptions = {
      method: "GET",
    };

    fetch(`http://localhost:3000/requests?userID=${user.id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setRequests(result))
      .catch((error) => console.log("error on getRequests", error));
  };

  const handleReload = () => {
    getRequests();
  };

  useEffect(() => {
    getRequests();
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
