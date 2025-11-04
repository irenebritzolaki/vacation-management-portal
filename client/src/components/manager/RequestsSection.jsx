import { useState } from "react";
import { History, FolderClock, ChevronRight } from "lucide-react";
import RequestsTable from "../common/RequestsTable";

function RequestsSection({
  requests,
  onNewRequest,
  onDeleteRequest,
  mode,
  users,
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="section-content">
      <header
        className="section-header"
        role="button"
        onClick={() => setIsOpen((s) => !s)}
        aria-expanded={isOpen}
      >
        <div className="header-left">
          <ChevronRight
            size={18}
            className={`chevron ${isOpen ? "rotated" : ""}`}
          />

          {mode === "personal" ? (
            <History size={20} />
          ) : (
            <FolderClock size={20} />
          )}

          <h2>
            {mode === "personal"
              ? "My Vacation Requests"
              : "All Vacation Requests"}
          </h2>
        </div>

        {mode === "personal" && (
          <div className="header-right">
            <button className="new-request-btn" onClick={onNewRequest}>
              New Request
            </button>
          </div>
        )}
      </header>

      <div className={`collapsible ${isOpen ? "open" : "closed"}`}>
        {" "}
        {requests.length === 0 ? (
          <p className="empty-text">
            No requests {mode === "personal" && "submitted"} yet.
          </p>
        ) : (
          <RequestsTable
            requests={requests}
            onDeleteRequest={onDeleteRequest}
            mode={mode}
            users={users}
          />
        )}
      </div>
    </div>
  );
}

export default RequestsSection;
