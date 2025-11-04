import { useState } from "react";
import "../common/Form.css";

function UserForm({ onSubmit, onCancel, mode = "create", initialData = {} }) {
  const [formData, setFormData] = useState(
    initialData || {
      username: "",
      email: "",
      password: "",
      employeeID: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ username: "", email: "", password: "", employeeID: "" });
  };

  return (
    <form className="dashboard-form user-form" onSubmit={handleSubmit}>
      <h3>{mode === "create" ? "Create New User" : "Edit User"}</h3>

      <div className="form-group">
        <label>Role:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="role"
              value="manager"
              checked={formData.role === "manager"}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
            Manager
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="employee"
              checked={formData.role === "employee"}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            />
            Employee
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Employee ID:</label>
        <input
          type="text"
          value={formData.employeeID}
          onChange={(e) =>
            setFormData({ ...formData, employeeID: e.target.value })
          }
          disabled={mode === "edit"}
          required
        />
      </div>

      <div className="form-group">
        <label>Username:</label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="text"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      </div>

      <div className="button-group">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">{mode === "create" ? "Submit" : "Update"}</button>
      </div>
    </form>
  );
}

export default UserForm;
