import { useUser } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const [currentUser] = useUser();

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar-image"
            src={currentUser?.avatar}
            alt="Аватар"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser?.name}</h1>
          <button
            type="button"
            className="profile__edit-btn"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__about">{currentUser?.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-btn"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section aria-label="Места" className="places">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
