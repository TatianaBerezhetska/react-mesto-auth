import React, {useRef} from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = useRef();
  
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
    
  }

  return(
    <PopupWithForm
          name="edit-avatar"
          title="Обновить аватар"
          buttonText="Сохранить"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <>
            <input
              type="url"
              className="popup__input popup__input_type_avatar"
              required
              id="avatar"
              name="avatar"
              placeholder="Введите ссылку"
              ref={avatarRef}
            />
            <span id="avatar-error" className="popup__error"></span>
          </>
        </PopupWithForm>
  )
}

export default EditAvatarPopup;