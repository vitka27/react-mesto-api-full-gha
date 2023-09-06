import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";

import api from "../utils/api";
import apiAuth from "../utils/auth";

import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import Register from "./Register/Register";
import Login from "./Login/Login";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

function App() {
  //* states
  // popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isPictureView, setIsPictureView] = useState(false);
  const [isMassagePopupOpen, setisMassagePopupOpen] = useState(false);
  const isOpen =
    isEditProfilePopupOpen ||
    isEditAvatarPopupOpen ||
    isAddPlacePopupOpen ||
    isDeletePopupOpen ||
    isPictureView;
  // state loading
  const [isLoading, setIsLoading] = useState(true);
  // context user
  const [currentUser, setCurrentUser] = useState({});
  // card
  const [cards, setCard] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedDeleteCard, setSelectedDeleteCard] = useState("");
  // auth
  const [isSuccessfully, setIsSuccessfully] = useState(false);
  const [isAuthorezed, setIsAuthorezed] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const localToken = localStorage.token;

  //* Authentication
  //* register
  function hadleSubmitRegister(data) {
    apiAuth
      .register(data)
      .then(() => {
        setIsSuccessfully(true);
        navigate("/sign-in");
      })
      .catch((error) => {
        console.error(`Ошибка: ${error}`);
        setIsSuccessfully(false);
      })
      .finally(() => setisMassagePopupOpen(true));
  }

  //*login
  function hadleSubmitLogin(data) {
    apiAuth
      .authorize(data)
      .then(({ token }) => {
        token && localStorage.setItem("token", token);
        setIsAuthorezed(true);
        checkToken();
      })
      .catch((error) => {
        console.error(`Ошибка: ${error}`);
        setIsSuccessfully(false);
        setisMassagePopupOpen(true);
      });
  }
  //*logout
  function removeToken() {
    localStorage.clear();
    navigate("/sign-in");
  }

  //*checkToken
  function checkToken() {
    if (localToken) {
      apiAuth
        .checkToken(localToken)
        .then((response) => {
          if (response.email) {
            setIsAuthorezed(true);
            setEmail(response.email);
          }
        })
        .catch((error) => console.error(`Ошибка: ${error}`))
        .finally(() => navigate("/"));
    }
  }
  useEffect(checkToken, []);

  //* closeALLpopups
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsPictureView(false);
    setisMassagePopupOpen(false);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeletePopupOpen() {
    setIsDeletePopupOpen(true);
  }
  function handleCardClick(card) {
    //setSelectedCard принимает карточку для открытия попапа просмотра
    setSelectedCard(card);
    setIsPictureView(true);
  }

  // удаляет  и добавляет слушатель Esc по статусу isOpen
  useEffect(() => {
    const handleESClose = (event) => event.key === "Escape" && closeAllPopups();

    if (isOpen) document.addEventListener("keydown", handleESClose);
    return () => {
      document.removeEventListener("keydown", handleESClose);
    };
  }, [isOpen]);

  //* closeOverlay

  function handleOverlayClose(event) {
    event.target.classList.contains("popup") && closeAllPopups();
  }

  //* init render card, user-prof
  useEffect(() => {
    Promise.all([api.getUser(localToken), api.getCards(localStorage.token)])
      .then(([dataUser, dataCards]) => {
        setCurrentUser(dataUser);
        setCard(dataCards);
        setIsLoading(false);
      })
      .catch((error) => console.error(`Ошибка: ${error}`));
  }, []);

  //* update user-info (name, about)
  function handleUpdateUser(data) {
    api
      .setUserInfo(data, localToken)
      .then((dataUser) => setCurrentUser(dataUser) && closeAllPopups())
      .catch((error) => console.error(`Ошибка: ${error}`));
  }

  //* onUpdataAvatar
  function handleUpdateAvatar(urlImage) {
    api
      .setUserAvatar(urlImage, localToken)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка: ${error}`));
  }

  //* AddPlace
  function handleAddPlace(newCard) {
    api
      .setCardData(newCard, localToken)
      .then((card) => {
        setCard([card, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка: ${error}`));
  }

  //* handleCardLike
  function handleCardLike(card, dataUser) {
    const isLiked = card.likes.some((like) => like._id === dataUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked, localToken)
      .then((newCard) => {
        setCard((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.error(`Ошибка: ${error}`));
  }

  //* handleCardDelete

  function handleCardDelete(cardID) {
    setSelectedDeleteCard(cardID);
    setIsDeletePopupOpen(true);
  }
  function submitCardDelete(event) {
    event.preventDefault();
    api
      .delPost(selectedDeleteCard, localToken)
      .then(() => {
        setCard((prevStrate) =>
          prevStrate.filter((item) => item._id !== selectedDeleteCard)
        );
        closeAllPopups();
      })
      .catch((error) => console.error(`Ошибка: ${error}`));
  }

  //*return app
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="wrapper">
        <Header onEmail={email} onSignOut={removeToken} />

        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute isAuthorezed={isAuthorezed} />}
          >
            <Route
              index
              element={
                <Main
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardPopupDelete={handleDeletePopupOpen}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onCardLoading={isLoading}
                  cards={cards}
                />
              }
            />
            <Route path="*" element={<Login />} />
          </Route>
          <Route
            path="/sign-up"
            element={<Register onRegister={hadleSubmitRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={hadleSubmitLogin} />}
          />
        </Routes>

        <Footer />

        <InfoTooltip
          name="message"
          isOpen={isMassagePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClose}
          onSuccessfully={isSuccessfully}
        />

        {/* ! Форма редактирования профиля*/}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClose}
          onUpdateUser={handleUpdateUser}
        />

        {/* ! Форма обновления аватар*/}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClose}
          onUpdateAvatar={handleUpdateAvatar}
        />

        {/* ! Форма создания карточки*/}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClose}
          onAddPlace={handleAddPlace}
        />

        {/* ! Форма удаления карточки*/}
        <PopupWithForm
          name="delete-card"
          nameButton="Да"
          title="Вы уверены?"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClose}
          onSubmit={submitCardDelete}
        />

        {/* ! Попап просмотра картинки  */}
        <ImagePopup
          isOpen={isPictureView}
          onClose={closeAllPopups}
          onCloseOverlay={handleOverlayClose}
          selectedCard={selectedCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
