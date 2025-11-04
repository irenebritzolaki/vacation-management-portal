import Modal from "./Modal";

export default function ConfirmationModal({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal isOpen={isOpen}>
      <h3>Confirm</h3>
      <p className="confirmation-message">{message}</p>
      <div className="modal-footer">
        <button onClick={onCancel} className="">
          Cancel
        </button>
        <button onClick={onConfirm} className="danger confirmation-btn">
          Delete
        </button>
      </div>
    </Modal>
  );
}
