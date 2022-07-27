import React from "react";

function ImagePopup({ selectedCard, isOpen, onClose }) {
  return (
    <div
      className={`popup popup_dark-bg popup_type_pic ${
        isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container">
        <div className="popup__container_pic">
          <button
            type="button"
            className="popup__close-button"
            aria-label="Close"
            onClick={onClose}
          ></button>
          <img
            className="popup__photo"
            src={selectedCard.link}
            alt={selectedCard.name}
          />
          <p className="popup__photo-caption">{selectedCard.name}</p>
        </div>
      </div>
    </div>
  );
}

export default ImagePopup;
