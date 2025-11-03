import "./PendingRequestCard.css";

function PendingRequestCard({ request, onAcceptRequest, onRejectRequest }) {
  const countDays = (startDate, endDate) => {
    const timeDifference = new Date(endDate) - new Date(startDate);
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference + 1; // count both start and end dates
  };

  return (
    <div className="pending-request-card">
      <div className="request-row">
        <span className="label">Submitted:</span>
        <span>{request.dateSubmitted}</span>
      </div>
      <div className="request-row">
        <span className="label">Employee:</span>
        <span>{request.employee}</span>
      </div>
      <div className="request-row">
        <span className="label">Dates:</span>
        <span>
          {request.startDate} -&gt; {request.endDate} (
          {countDays(request.startDate, request.endDate)} days)
        </span>
      </div>
      <div className="request-row">
        <span className="label">Reason:</span>
        <span>{request.reason}</span>
      </div>
      <div className="actions">
        <button onClick={onAcceptRequest}>Accept</button>
        <button onClick={onRejectRequest}>Reject</button>
      </div>
    </div>
  );
}

export default PendingRequestCard;
