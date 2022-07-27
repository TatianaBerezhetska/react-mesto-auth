import React, { useEffect, useState, useContext } from "react";
import addButton from "../images/Addbutton.svg";
import Card from "./Card.js";
import { CurrentUserContext } from "./contexts/CurrentUserContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  cards,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__edit-avatar"
          type="button"
          aria-label="Edit"
          onClick={onEditAvatar}
        ></button>
        <img
          className="profile__pic"
          src={currentUser.avatar}
          alt="Фото профиля"
        />
        <h1 className="profile__name">{currentUser.name}</h1>
        <button
          className="profile__edit"
          type="button"
          aria-label="Edit"
          onClick={onEditProfile}
        ></button>
        <p className="profile__caption">{currentUser.about}</p>
        <button className="profile__add" type="button" onClick={onAddPlace}>
          <img
            className="profile__add-icon"
            src={addButton}
            alt="Кнопка Добавить"
          />
        </button>
      </section>
      <section className="elements">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              handleClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
