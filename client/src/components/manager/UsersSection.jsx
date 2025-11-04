import { useState } from "react";
import { Users, ChevronDown, ChevronRight } from "lucide-react";
import UsersTable from "./UsersTable";

function UsersSection({ users, onCreateUser, onEditUser, onDeleteUser }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="section-content">
      <header className="section-header">
        <div
          className="header-left"
          role="button"
          onClick={() => setIsOpen((s) => !s)}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <ChevronDown
              size={18}
              className={`chevron ${isOpen ? "rotated" : ""}`}
            />
          ) : (
            <ChevronRight size={18} className="chevron" />
          )}

          <Users size={22} className="users-icon" />
          <h2>Registered users</h2>
        </div>

        <div className="header-right">
          <button className="create-user-btn" onClick={onCreateUser}>
            Create user
          </button>
        </div>
      </header>

      <div className={`collapsible ${isOpen ? "open" : "closed"}`}>
        {users.length === 0 ? (
          <p className="empty-text">No registered users yet.</p>
        ) : (
          <UsersTable
            users={users}
            onEditUser={onEditUser}
            onDeleteUser={onDeleteUser}
          />
        )}
      </div>
    </div>
  );
}

export default UsersSection;
