import React from "react";

function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <form
          className={`popup__form popup__form_${name}`}
          name={`${name}`}
          noValidate
          onSubmit={onSubmit}
        >
          <h2 className="popup__heading">{title}</h2>
          {children}
          <button type="submit" className="popup__submit-button">
            {buttonText}
          </button>
          <button
            type="button"
            className="popup__close-button"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
