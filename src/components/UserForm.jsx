import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <h3>{mode === "create" ? "Create New User" : "Update User"}</h3>
      <div>
        <label>Username: </label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label>Email: </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="text"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label>Employee ID: </label>
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
      <div>
        <button type="submit">{mode === "create" ? "Submit" : "Update"}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UserForm;
