import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const dataUser = useContext(CurrentUserContext);

  const isLiked = card.likes.some((like) => like._id === dataUser._id);
  const isOwn = dataUser._id === card.owner;

  function handleLikeClick() {
    onCardLike(card, dataUser);
  }
  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  return (
    <div className="content-user__item">
      <img
        alt={card.name}
        src={card.link}
        onError={(e) => {
          e.currentTarget.src =
            "https://mega-zapravka.ru/upload/ammina.optimizer/jpg-webp/q80/upload/iblock/c7b/c7b8c69aaf77214fce3a0da37c351942.webp";
        }}
        className="content-user__image"
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <h2 className="content-user__title">{card.name}</h2>
      <div className="content-user__wrap-like">
        <button
          onClick={handleLikeClick}
          type="button"
          className={
            isLiked
              ? "content-user__like content-user__like_state_active"
              : "content-user__like"
          }
          aria-label="Кнопка мне нравится"
        />
        <span className="content-user__counter">{card.likes.length}</span>
      </div>
      <button
        onClick={handleDeleteClick}
        type="button"
        className={isOwn ? "content-user__del" : ""}
        aria-label="Удалить фото"
      />
    </div>
  );
}
