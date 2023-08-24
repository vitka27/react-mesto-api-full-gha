import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React, { useContext, useEffect, useState } from "react";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, onCloseOverlay }) {
  const userData = useContext(CurrentUserContext);
  const [name, setName] = useState("name");
  const [about, setAbout] = useState("description");

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name,
      about,
    });
    onClose();
  }

  useEffect(() => {
    setName(userData.name);
    setAbout(userData.about);
  }, [userData, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseOverlay={onCloseOverlay}
    >
      <input
        value={name || ""}
        onChange={(event) => setName(event.target.value)}
        minLength={2}
        maxLength={40}
        required
        type="text"
        placeholder="Имя"
        name="name"
        id="name-card"
        className="popup__input popup__input_form_name"
        aria-label="строка ввода имя"
      />
      <span id="name-card-err" className="popup__span-input-error">
        {" "}
      </span>
      <input
        value={about || ""}
        onChange={(event) => setAbout(event.target.value)}
        minLength={2}
        maxLength={200}
        required
        type="text"
        placeholder="О себе"
        name="info"
        id="prof-card"
        className="popup__input popup__input_form_my-info"
        aria-label="строка ввода информации о себе"
      />
      <span id="prof-card-err" className="popup__span-input-error">
        {" "}
      </span>
    </PopupWithForm>
  );
}
