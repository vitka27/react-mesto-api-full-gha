export default function Popup({
  onCloseOverlay,
  name,
  isOpen,
  onClose,
  children,
}) {
  return (
    <div
      onClick={onCloseOverlay}
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
    >
      <div className="popup__container">
        {children}
        <button
          className="popup__close"
          aria-label="кнопка закрыть попап"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
