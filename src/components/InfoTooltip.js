import React from "react";

function InfoTooltip({ title, image, isOpen, onClose }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <div className="popup__form">
          <img className="popup__image" src={image}/>
          <h2 className="tooltip__text">{title}</h2>
          <button
            type="button"
            className="popup__close-button"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
