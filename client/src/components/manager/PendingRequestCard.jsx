import "./PendingRequestCard.css";

function PendingRequestCard({
  request,
  users,
  onApproveRequest,
  onRejectRequest,
}) {
  const formatDate = (date) => {
    let parts = date.split("-");
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  const countDays = (startDate, endDate) => {
    const timeDifference = new Date(endDate) - new Date(startDate);
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference + 1; // count both start and end dates
  };

  const getUserDetails = (userID) => {
    return users.find((u) => u.id === userID);
  };

  return (
    <div className="pending-request-card">
      <div className="request-row">
        <span className="label">Submitted:</span>
        <span>{formatDate(request.dateSubmitted)}</span>
      </div>
      <div className="request-row">
        <span className="label">Employee:</span>
        <span>{getUserDetails(request.userID).username}</span>
      </div>
      <div className="request-row">
        <span className="label">Dates:</span>
        <span>
          {formatDate(request.startDate)} &rArr; {formatDate(request.endDate)} (
          {countDays(request.startDate, request.endDate)} days)
        </span>
      </div>
      <div className="request-row">
        <span className="label">Reason:</span>
        <span>{request.reason}</span>
      </div>
      <div className="actions">
        <button onClick={onApproveRequest}>Approve</button>
        <button onClick={onRejectRequest}>Reject</button>
      </div>
    </div>
  );
}

export default PendingRequestCard;
