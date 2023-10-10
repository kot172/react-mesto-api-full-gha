import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
// import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import React, { useEffect, useState } from "react";
import CurrentUserContext from "../context/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import { register, login, getContent } from "../utils/auth";
import ProtectedRouteElement from "./ProtectedRoute/ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip/InfoTooltip.js";

function App() {
  //стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopup, setImagePopup] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isSend, setIsSend] = useState(false);

  //стейт контекста
  const [currentUser, setCurrentUser] = useState({});

  //стейты карточки
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState("");
  //стейты входа
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);


  const token = localStorage.getItem("jwt");


  const navigatе = useNavigate();

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopup(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function infoTooltipPopupOpen() {
    setIsInfoTooltipOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteClick(cardId) {
    setDeleteCardId(cardId);
    setIsDeletePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
  }

  //Проверка токена при загрзке страницы
  useEffect(() => {
    if (token) {
      getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            navigatе("/", { replace: true });
          }
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    Promise.all([api.getInfo(token), api.getCards(token)])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser);
        setCards(dataCard);
      })
      .catch((err) => console.log(`Что-то пошло не так: ${err}`));
  }, [loggedIn]);

  //универсальная функция, принимающая функцию запроса
  function handleSubmit(request) {
    // изменяем текст кнопки до вызова запроса
    setIsSend(true);
    request()
      // закрывать попап нужно только в `then`
      .then(closeAllPopups)
      // в каждом запросе нужно ловить ошибку
      // console.error обычно используется для логирования ошибок, если никакой другой обработки ошибки нет
      .catch(console.error)
      // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
      .finally(() => setIsSend(false));
  }

  //Удаление карточки
  function handleDeleteCard(evt) {
    evt.preventDefault();
    setIsSend(true);
    api
      .deleteCard(deleteCardId, token)
      .then((res) => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка удаления карточки ${err}`))
      .finally(() => setIsSend(false));
  }

  //Обновить данные профиля
  function handleUpdateUser(inputValues) {
    function makeRequest() {
      return api.editUserInfo(inputValues, token)
        .then(setCurrentUser);
    }
    handleSubmit(makeRequest);
  }

  // редактирование аватарки
  function handleUpdateAvatar(inputValue) {
    function makeRequest() {
      return api
        .editUserAvatar(inputValue.avatar, token)
        .then((dataUser) => {
          setCurrentUser(dataUser);
        })
    }
    handleSubmit(makeRequest);
  }

  //добавление карточки
  function handleAddPlaceSubmit(inputValue) {
    function makeRequest() {
      return api
        .addCard(inputValue, token)
        .then((res) => {
          setCards([res, ...cards]);
        })
    }
    handleSubmit(makeRequest);
  }

  //Обработка запроса на регистрацию
  function handleRegister(email, password) {
    register(email, password)
      .then((res) => {
        if (res) {
          setIsRegister(true);
          navigatе("/signin", { replace: true });
        } else {
          setIsRegister(false);
        }
      })
      .catch(() => {
        setIsRegister(false);
        console.error("Ошибка при регистрации пользователя");
      })
      .finally(() => infoTooltipPopupOpen());
  }

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  //Обработка запроса на авторизацию
  function handleLogin(email, password) {
    login(email, password)
      .then((data) => {
        if (data.token) {
          console.log(data);
          localStorage.setItem('jwt', data.token);
          setEmail(email);
          handleLoggedIn();
          navigatе("/", { replace: true });
        }
      })
      .catch(() => {
        setLoggedIn(false);
        infoTooltipPopupOpen();
        console.error(console.error("Ошибка при авторизации пользователя"));
      });
  }
  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigatе("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onLogout={handleLogout} email={email} />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onDelete={handleDeleteClick}
                cards={cards}
                logged={loggedIn}
              />
            }
          />

          <Route
            name="signin"
            path="/signin"
            element={<Login login={handleLogin} />}
          />

          <Route
            name="signup"
            path="/signup"
            element={<Register register={handleRegister} />}
          />

          <Route path="*" element={<navigatе to="/" replace />} />
        </Routes>

        <InfoTooltip
          isConfirmed={isRegister}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          isSend={isSend}
          onClose={closeAllPopups}
        />

        {
          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            isSend={isSend}
            onClose={closeAllPopups}
          />
        }

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          titleButton="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteCard}
          isSend={isSend}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
