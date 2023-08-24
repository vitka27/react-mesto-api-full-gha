export default function ImagePopup({
  isOpen,
  onClose,
  onCloseOverlay,
  selectedCard,
}) {
  return (
    <div onClick={onCloseOverlay} className={`popup popup-image ${isOpen && "popup_opened"}`}>
      <div className=" popup-image__box">
        <img
          src={selectedCard.link}
          onError={(event) => {
            event.currentTarget.src =
              "https://mega-zapravka.ru/upload/ammina.optimizer/jpg-webp/q80/upload/iblock/c7b/c7b8c69aaf77214fce3a0da37c351942.webp";
          }}
          className="popup-image__pic"
          alt={selectedCard.name}
        />
        <h3 className="popup-image__title">{selectedCard.name}</h3>
        <button
          className="popup__close"
          aria-label="кнопка закрыть попап"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
