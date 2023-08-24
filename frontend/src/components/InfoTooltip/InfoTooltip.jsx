import Popup from "../Popup/Popup";
import successfully from "../../image/successfully.svg";
import error from "../../image/error.svg";

export default function InfoTooltip({
  name,
  isOpen,
  onClose,
  onCloseOverlay,
  onSuccessfully,
}) {
  return (
    <Popup
      name={name}
      isOpen={isOpen}
      onClose={onClose}
      onCloseOverlay={onCloseOverlay}
    >
      <div className="popup__massege">
        <img
          className="popup__massege-image"
          src={onSuccessfully ? successfully : error}
          alt={onSuccessfully ? 'успешно' : 'ошибка'}
        />
        <p className="popup__massege-title">
          {onSuccessfully
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так!Попробуйте ещё раз."}
        </p>
      </div>
    </Popup>
  );
}
