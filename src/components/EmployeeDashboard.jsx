import { useState } from "react";
import NewRequestForm from "./NewRequestForm";

const mockRequests = [
  {
    id: 1,
    dateSubmitted: "2025-10-30",
    startDate: "2025-12-01",
    endDate: "2025-12-05",
    reason: "vacation",
    status: "pending",
  },
  {
    id: 2,
    dateSubmitted: "2025-10-28",
    startDate: "2025-11-10",
    endDate: "2025-11-12",
    reason: "rest",
    status: "approved",
  },
  {
    id: 3,
    dateSubmitted: "2025-10-30",
    startDate: "2025-11-10",
    endDate: "2025-11-12",
    reason: "just because",
    status: "rejected",
  },
];

function RequestEntry({ request, onDeleteRequest }) {
  const countDays = (startDate, endDate) => {
    const timeDifference = new Date(endDate) - new Date(startDate);
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference + 1; // count both start and end dates
  };

  return (
    <tr>
      <td>{request.dateSubmitted}</td>
      <td>
        {request.startDate} -&gt; {request.endDate}
      </td>
      <td>{countDays(request.startDate, request.endDate)}</td>
      <td>{request.reason}</td>
      <td>{request.status}</td>
      <td>
        {request.status === "pending" ? (
          <button onClick={onDeleteRequest}>Delete</button>
        ) : (
          <span></span>
        )}
      </td>
    </tr>
  );
}

export default function EmployeeDashboard({ user, onLogout }) {
  const [requests, setRequests] = useState(mockRequests);
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

  return (
    <div className="dashboard">
      <button onClick={onLogout}>Logout</button>
      <h1>Hello, {user.username}</h1>

      {showForm ? (
        <NewRequestForm
          onCancel={() => setShowForm(false)}
          onSubmit={handleSubmitNewRequest}
        />
      ) : (
        <div>
          <h2>Your Vacation Requests</h2>
          <button onClick={handleNewRequest}>New Request</button>

          {requests.length === 0 ? (
            <p>No requests submitted yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date submitted</th>
                  <th>Dates requested</th>
                  <th>Total days</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <RequestEntry
                    key={req.id}
                    request={req}
                    onDeleteRequest={() => handleDeleteRequest(req.id)}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
