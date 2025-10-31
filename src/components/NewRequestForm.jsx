import { useState } from "react";

function NewRequestForm({ onSubmit, onCancel }) {
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
    <form onSubmit={handleSubmit}>
      <h3>New Vacation Request</h3>
      <div>
        <label>Start Date: </label>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => handleStartDateChange(e)}
          min={today}
          required
        />
      </div>
      <div>
        <label>End Date: </label>
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
      <div>
        <label>Reason: </label>
        <textarea
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          required
        />
      </div>
      <div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default NewRequestForm;
