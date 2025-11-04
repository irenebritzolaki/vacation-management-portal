import "./PendingRequestCard.css";
import { formatDate, countDays } from "../../helpers";

function PendingRequestCard({
  request,
  users,
  onApproveRequest,
  onRejectRequest,
}) {
  const getUserDetails = (userID) => users.find((u) => u.id === userID);

  return (
    <div className="pending-request-card">
      <div className="request-header">
        <h4>{getUserDetails(request.userID).username}</h4>
        <span className="submitted-date">
          Submitted: {formatDate(request.dateSubmitted)}
        </span>
      </div>

      <div className="request-details">
        <div>
          <span className="label">Dates:</span>
          <span>
            {formatDate(request.startDate)} → {formatDate(request.endDate)} (
            {countDays(request.startDate, request.endDate)} days)
          </span>
        </div>
        <div>
          <span className="label">Reason:</span>
          <span className="reason-text">{request.reason}</span>
        </div>
      </div>

      <div className="actions">
        <button className="approve" onClick={onApproveRequest}>
          Approve
        </button>
        <button className="reject" onClick={onRejectRequest}>
          Reject
        </button>
      </div>
    </div>
  );
}

export default PendingRequestCard;
