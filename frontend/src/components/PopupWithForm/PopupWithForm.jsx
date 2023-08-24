import Popup from "../Popup/Popup";

export default function PopupWithForm({
  name,
  title,
  nameButton,
  isOpen,
  onClose,
  onCloseOverlay,
  children,
  onSubmit,
  ...props
}) {
  return (
    <Popup onCloseOverlay={onCloseOverlay} name={name} isOpen={isOpen} onClose={onClose}>
        <form
          // noValidate=""
          action="#"
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
        >
          <h3 className="popup__title">{title}</h3>
          <fieldset className="popup__user-info">
            {children}
            <button
              className="popup__submit"
              name="submitForm"
              type="submit"
              aria-label="удалить"
            >
              {nameButton || "Сохранить"}
            </button>
          </fieldset>
        </form>
    </Popup>

  );
}
