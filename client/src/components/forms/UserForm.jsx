import { useState } from "react";
import bcrypt from "bcryptjs";

function UserForm({ onSubmit, onCancel, mode = "create", initialData = {} }) {
  const [formData, setFormData] = useState({
    id: initialData?.id || "",
    employeeID: initialData?.employeeID || "",
    username: initialData?.username || "",
    email: initialData?.email || "",
    password: "",
    role: initialData?.role || "employee",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(mode === "create");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = { ...formData };

    if (updatePassword) {
      submissionData.password = await bcrypt.hash(formData.password, 10);
    } else if (!updatePassword) {
      delete submissionData.password;
    }

    onSubmit(submissionData);

    setFormData({
      username: "",
      email: "",
      password: "",
      employeeID: "",
      role: "employee",
    });
    setUpdatePassword(mode === "create");
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
              required
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
          pattern="[0-9]{7}"
          placeholder="1234567"
          title="Employee ID must be exactly 7 digits."
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
          pattern="[a-z]{3,12}"
          placeholder="john"
          title="Username must be 3–12 lowercase letters (a–z)."
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
          placeholder="john@example.com"
          title="Enter a valid email address (e.g., name@company.com)."
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        {mode === "edit" ? (
          <label className="update-password">
            Set new password
            <input
              type="checkbox"
              checked={updatePassword}
              onChange={() => setUpdatePassword(!updatePassword)}
            />
          </label>
        ) : (
          <label>Password:</label>
        )}

        {updatePassword && (
          <>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              placeholder="aBc1234@"
              pattern="(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}"
              title="Password must be at least 8 characters long and include one uppercase letter, one number, and one special character."
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required={mode === "create" || updatePassword}
            />
            <label className="show-password">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </>
        )}
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
