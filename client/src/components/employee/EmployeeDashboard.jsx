import { useState, useEffect } from "react";
import NewRequestForm from "./NewRequestForm";
import RequestsTable from "../common/RequestsTable";
import Header from "../common/Header";

function EmployeeDashboard({ user, onSignout }) {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleNewRequest = () => {
    setShowForm(true);
  };

  const handleSubmitNewRequest = (newRequestData) => {
    const today = new Date().toISOString().split("T")[0];
    const newRequest = {
      id: Date.now(),
      dateSubmitted: today,
      status: "pending",
      ...newRequestData,
    };
    setRequests([...requests, newRequest]);
    setShowForm(false);
  };

  const handleDeleteRequest = (requestID) => {
    const updatedRequests = requests.filter((req) => req.id !== requestID);
    setRequests(updatedRequests);
  };

  const getRequests = () => {
    var requestOptions = {
      method: "GET",
    };

    fetch(
      `http://localhost:3000/requests?employeeID=${user.employeeID}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setRequests(result))
      .catch((error) => console.log("error on getRequests", error));
  };

  useEffect(() => {
    getRequests();
  }, []);

  return (
    <div className="dashboard">
      <Header userName={user.username} onSignOut={onSignout} />
      <div className="dashboard-main">
        {showForm ? (
          <NewRequestForm
            onCancel={() => setShowForm(false)}
            onSubmit={handleSubmitNewRequest}
          />
        ) : (
          <section className="requests">
            <header className="section-header">
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
