import React from 'react';


const Modal = ({ isOpen, onClose, onSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="man-modal-ccc">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
            <i className='fas fa-close'></i>
        </button>
        <form onSubmit={onSubmit}>
          {children}
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>

      </div>
    </div>
  );
};

export default Modal;
