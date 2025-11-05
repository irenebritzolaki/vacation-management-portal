import { useState } from "react";
import "./Form.css"; // reuse the same CSS for consistent style

function RequestForm({ onSubmit, onCancel }) {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ startDate: "", endDate: "", reason: "" });
  };

  const handleStartDateChange = (e) => {
    const newStart = e.target.value;
    setFormData((prev) => {
      const updated = { ...prev, startDate: newStart };
      if (prev.endDate && prev.endDate < newStart) {
        updated.endDate = "";
      }
      return updated;
    });
  };

  return (
    <form className="dashboard-form request-form" onSubmit={handleSubmit}>
      <h3>New Vacation Request</h3>

      <div className="form-group">
        <label>Start Date:</label>
        <input
          type="date"
          value={formData.startDate}
          onChange={handleStartDateChange}
          min={today}
          required
        />
      </div>

      <div className="form-group">
        <label>End Date:</label>
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) =>
            setFormData({ ...formData, endDate: e.target.value })
          }
          min={formData.startDate}
          required
        />
      </div>

      <div className="form-group">
        <label>Reason:</label>
        <textarea
          maxLength={25}
          value={formData.reason}
          placeholder="Just because :)"
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          required
        />
      </div>

      <div className="button-group">
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default RequestForm;
