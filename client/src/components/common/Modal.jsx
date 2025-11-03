import "./Modal.css";

function Modal({ children, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">{children}</div>
    </div>
  );
}

export default Modal;
