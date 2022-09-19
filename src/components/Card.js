import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, handleClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__delete-button ${
    !isOwn && "element__delete-button_invisible"
  }`;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && `element__like-button_active`
  }`;

  function handleCardClick() {
    handleClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <img
        className="element__photo"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      <div className="element__caption">
        <h2 className="element__description">{card.name}</h2>
        <div className="element__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label="Close"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        aria-label="Delete"
        onClick={handleDeleteClick}
      ></button>
    </article>
  );
}

export default Card;
