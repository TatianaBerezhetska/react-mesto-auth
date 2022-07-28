import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api";
import * as auth from "../utils/Auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import InfoTooltip from "./InfoTooltip";
import successIcon from "../images/Success.svg";
import failureIcon from "../images/Failure.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const [infoToolTitle, setInfoToolTitle] = useState("");
  const [infoToolImg, setInfoToolImg] = useState({});

  const history = useHistory();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .catch((err) => {
        console.log(`Ошибка при запросе данных карточек с сервера ${err}`);
      });
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(`Ошибка при запросе данных карточек с сервера ${err}`);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка при лайке/дизлайке ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => {
          return cards.filter((item) => item._id !== card._id);
        });
      })
      .catch((err) => {
        console.log(`Ошибка удаления карточки ${err}`);
      });
  }

  const setInfoError = (errorText) => {
    setInfoToolTitle("Что-то пошло не так! Попробуйте ещё раз.");
    setInfoToolImg(failureIcon);
    setIsInfoTooltipOpen(true);
  };

  const handleRegisterUser = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        if (!res.error) {
          setInfoToolTitle("Вы успешно зарегистрировались!");
          setInfoToolImg(successIcon);
          setIsInfoTooltipOpen(true);
          setTimeout(() => {
            history.push("/sign-in");
            closeAllPopups();
          }, "3000");
        } else {
          setInfoToolTitle("Что-то пошло не так! Попробуйте ещё раз.");
          setInfoToolImg(failureIcon);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          return res;
        }
      })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          history.push("/feed");
        } else {
          setInfoToolTitle("Что-то пошло не так! Попробуйте ещё раз.");
          setInfoToolImg(failureIcon);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTitle("Что-то пошло не так! Попробуйте ещё раз.");
        setInfoToolImg(failureIcon);
        setIsInfoTooltipOpen(true);
      });
  };

  function tokenCheck() {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      if (token) {
        auth
          .getContent(token)
          .then((res) => {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            history.push("/feed");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleUpdateUser = (data) => {
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении данных пользователя ${err}`);
      });
  };

  const handleUpdateAvatar = (newAvatar) => {
    api
      .setUserAvatar(newAvatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при обновлении аватара пользователя ${err}`);
      });
  };

  const handleAddPlace = (newCard) => {
    api
      .postNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка при добавлении места ${err}`);
      });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header email={userEmail} />
        <Switch>
          <Route exact path="/">
            {!loggedIn && <Redirect to="/sign-in" />}
          </Route>

          <ProtectedRoute
            exact
            path="/feed"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/sign-up">
            <Register onRegisterUser={handleRegisterUser} />
            <InfoTooltip
              title={infoToolTitle}
              image={infoToolImg}
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
            />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
            <InfoTooltip
              title={infoToolTitle}
              image={infoToolImg}
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
            />
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        ></EditProfilePopup>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        ></EditAvatarPopup>

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        ></AddPlacePopup>

        <PopupWithForm
          name="submit-action"
          title="Вы уверены?"
          buttonText="Да"
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          selectedCard={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
