import { useCallback, useEffect, useState } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { useUser } from "../contexts/CurrentUserContext";
import { mestoApi } from "../utils/Api";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Header from "./Header";
import Footer from './Footer'
import Loader from "./Loader";
import Main from "./Main";
import AddPlacePopup from "./popups/AddPlacePopup";
import EditAvatarPopup from "./popups/EditAvatarPopup";
import EditProfilePopup from "./popups/EditProfilePopup";
import ImagePopup from "./popups/ImagePopup";
import InfoPopup from "./popups/InfoPopup";
import PopupWithForm from "./popups/PopupWithForm";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useUser();
  const [isLoading, setLoading] = useState(true);
  const [isSuccesSignUp, setSuccessSignUp] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    handleCheckToken()
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (currentUser) {
      mestoApi
        .getCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => console.error(err.message));
    }
  }, [currentUser]);

  const closeAllPopups = useCallback(() => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoPopupOpen(false);
    setDeletedCard(null);
    setSelectedCard(null);
  }, []);

  const handleSignIn = useCallback((data) => {
    return mestoApi
      .login(data)
      .then((data) => {
        mestoApi.setToken(data.token);
        handleCheckToken();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleSignUp = useCallback((values) => {
    return mestoApi
      .register(values)
      .then(
        ({ data }) => {
          setSuccessSignUp(true);
          handleSignIn(values);
        },
        (err) => {
          setSuccessSignUp(false);
          console.log(err.message);
        }
      )
      .then(() => setInfoPopupOpen(true));
  }, []);

  const handleCheckToken = useCallback(() => {
    return mestoApi
      .check()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        setCurrentUser(null);
        mestoApi.removeToken();
        return Promise.reject(err);
      });
  }, []);

  const handleSignOut = useCallback((data) => {
    mestoApi.removeToken();
    setCurrentUser(null);
  }, []);

  const handleCardLike = useCallback(
    (card) => {
      const isLiked = card.likes.some((i) => i._id === currentUser._id);

      mestoApi
        .setLikeStatus(card._id, !isLiked)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => console.error(err.message));
    },
    [cards, currentUser]
  );

  const handleCardDelete = useCallback(() => {
    return mestoApi
      .removeCard(deletedCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== deletedCard._id);
        setCards(newCards);
        setDeletedCard(null);
      })
      .catch((err) => console.error(err.message));
  }, [deletedCard, cards]);

  const handleUpdateAvatar = useCallback(
    (data) => {
      return mestoApi
        .setAvatar(data)
        .then((user) => {
          closeAllPopups();
          setCurrentUser(user);
        })
        .catch((err) => console.error(err.message));
    },
    [closeAllPopups, setCurrentUser]
  );

  const handleUpdateUser = useCallback(
    (data) => {
      return mestoApi
        .patchUser(data)
        .then((user) => {
          setCurrentUser(user);
          closeAllPopups();
        })
        .catch((err) => console.error(err.message));
    },
    [closeAllPopups, setCurrentUser]
  );

  const handleAddCard = useCallback(
    (data) => {
      return mestoApi
        .addCard(data)
        .then((newCard) => {
          setCards((prev) => [newCard, ...prev]);
          closeAllPopups();
        })
        .catch((err) => console.error(err.message));
    },
    [closeAllPopups]
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="wrapper">
        <Header email={currentUser?.email} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            onEditProfile={() => setEditProfilePopupOpen(true)}
            onAddPlace={() => setAddPlacePopupOpen(true)}
            onEditAvatar={() => setEditAvatarPopupOpen(true)}
            onCardClick={(card) => setSelectedCard(card)}
            onCardLike={handleCardLike}
            onCardDelete={setDeletedCard}
            cards={cards}
            component={Main}
          />
          <Route path="/sign-up">
            <Register onSubmit={handleSignUp} />
          </Route>
          <Route path="/sign-in">
            <Login onSubmit={handleSignIn} />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
        {currentUser && <Footer />}
      </div>

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />

      <EditProfilePopup
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        onSubmit={handleUpdateUser}
      />

      <AddPlacePopup
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        onSubmit={handleAddCard}
      />

      <EditAvatarPopup
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        onSubmit={handleUpdateAvatar}
      />

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={deletedCard}
        name="confirm"
        title="Вы уверены?"
        buttonText="Да"
        onSubmit={handleCardDelete}
      />

      <InfoPopup
        isOpen={isInfoPopupOpen}
        onClose={closeAllPopups}
        success={isSuccesSignUp}
      />
    </>
  );
}

export default App;
