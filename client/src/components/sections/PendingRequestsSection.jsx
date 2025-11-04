import PendingRequestCard from "./PendingRequestCard";
import { Loader } from "lucide-react";

function PendingRequestsSection({
  requests,
  onApproveRequest,
  onRejectRequest,
  users,
}) {
  return (
    <aside className="right-panel">
      <header className="section-header small">
        <div className="header-left simple">
          <Loader size={20} />
          <h3>Pending Requests ({requests.length})</h3>
        </div>
      </header>

      <div className="pending-list">
        {requests.length === 0 ? (
          <p className="empty-text">No pending requests.</p>
        ) : (
          requests.map((request) => (
            <PendingRequestCard
              key={request.id}
              users={users}
              request={request}
              onApproveRequest={() => onApproveRequest(request.id)}
              onRejectRequest={() => onRejectRequest(request.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
}

export default PendingRequestsSection;
