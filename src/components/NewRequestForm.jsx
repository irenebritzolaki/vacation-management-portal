import { useState } from "react";

function NewRequestForm({ onSubmit, onCancel }) {
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

  return (
    <form onSubmit={handleSubmit}>
      <h3>New Vacation Request</h3>
      <div>
        <label>Start Date: </label>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
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
