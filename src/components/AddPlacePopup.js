import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          type="text"
          className="popup__input popup__input_type_place-name"
          required
          id="placename"
          name="placename"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={name}
          onChange={handleNameChange}
        />
        <span id="placename-error" className="popup__error"></span>
        <input
          type="url"
          className="popup__input popup__input_type_place-link"
          required
          id="placelink"
          name="placelink"
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleLinkChange}
        />
        <span id="placelink-error" className="popup__error"></span>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
