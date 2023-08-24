import { useEffect } from "react";
import useInputForm from "../../hooks/useInputForm";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onCloseOverlay,
  onUpdateAvatar,
}) {
  const { values, setValues, onChange } = useInputForm([]);
  useEffect(() => {
    setValues([]);
  }, [isOpen, setValues]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update-avatar"
      nameButton="Обновить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseOverlay={onCloseOverlay}
    >
      <input
        onChange={onChange}
        value={values.link || ""}
        id="name-url-avatar"
        required=""
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        className="popup__input popup__input_form_src"
        aria-label="строка ввода ссылки на картинку"
      />
      {/* <span id="name-url-avatar-err" className="popup__span-input-error" /> */}
    </PopupWithForm>
  );
}
