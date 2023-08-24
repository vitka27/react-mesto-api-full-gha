import { useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useState } from "react";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onCloseOverlay,
  onAddPlace,
}) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      title,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-content"
      nameButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
      onSubmit={handleSubmit}
    >
      <input
        onChange={(event) => setTitle(event.target.value)}
        value={title || ""}
        minLength={2}
        maxLength={30}
        id="name-place"
        required=""
        type="text"
        placeholder="Название"
        name="name" // link
        className="popup__input popup__input_form_title"
        aria-label="строка ввода наименования картинки"
      />
      <span id="name-place-err" className="popup__span-input-error" />
      <input
        onChange={(event) => setLink(event.target.value)}
        value={link || ""}
        id="name-url"
        required=""
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        className="popup__input popup__input_form_src"
        aria-label="строка ввода ссылки на картинку"
      />
      <span id="name-url-err" className="popup__span-input-error" />
    </PopupWithForm>
  );
}
