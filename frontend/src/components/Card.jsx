import { useUser } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const [currentUser] = useUser();

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like-btn ${
    isLiked ? " place__like-btn_active" : ""
  }`;

  return (
    <article className="place">
      <div className="place__img-wrapper">
        <img
          alt={card.name}
          src={card.link}
          className="place__img"
          onClick={() => onCardClick(card)}
        />
      </div>
      <div className="place__info">
        <h2 className="place__title">{card.name}</h2>
        <div className="place__like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)}
          ></button>
          <div className="place__like-count">{card.likes.length}</div>
        </div>
      </div>
      {isOwn && (
        <button
          type="button"
          className="place__trash-btn"
          onClick={() => onCardDelete(card)}
        ></button>
      )}
    </article>
  );
}

export default Card;
