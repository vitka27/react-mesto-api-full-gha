import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";
import Loader from "../Loader/Loader.jsx";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onCardPopupDelete,
  onCardLike,
  onCardDelete,
  onCardLoading,
  cards,
}) {
  const dataUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      {/* Профиль пользователя */}
      <section className="profile-user">
        <div className="profile-user__card">
          <div className="profile-user__block-avatar" onClick={onEditAvatar}>
            <img
              src={dataUser.avatar}
              alt="Аватар"
              className="profile-user__avatar"
            />
          </div>
          <div className="profile-user__info">
            <div className="profile-user__wrap">
              <h1 className="profile-user__name">{dataUser.name}</h1>
              <button
                type="button"
                className="profile-user__edit"
                aria-label="кнопка редактирования информации о себе"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile-user__profession">{dataUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile-user__add-content"
          aria-label="кнопка добавить контент"
          onClick={onAddPlace}
        />
      </section>
      {/* Основной контент */}
      <section className="content-user" aria-label="контент с фото">
        {onCardLoading ? (
          <Loader />
        ) : (
          cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardPopupDelete={onCardPopupDelete}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })
        )}
      </section>
    </main>
  );
}
