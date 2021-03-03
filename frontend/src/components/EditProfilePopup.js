import React from 'react';

import PopupWithForm from "./PopupWithForm";

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  
  const currentUserInfo = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUserInfo.name);
  const [description, setDescription] = React.useState(currentUserInfo.about);
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isNameError, setIsNameError] = React.useState(false);
  const [isDescriptionError, setIsDescriptionError] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    setIsFormValid(true);
    setIsNameError(false);
    setIsDescriptionError(false);
  }, [props.isOpen]);

  function handleNotValid() {
    setError('Поле не может содержать менее 2 символов');
    setIsFormValid(false);
  }

  function handleValid() {
    if (document.querySelector('#username-input').value.length >= 2 && document.querySelector('#bio-input').value.length >= 2) {
      setIsFormValid(true);
    }
  }

  function handleNameChange(e) {
    if (e.target.value.length < 2) {
      setIsNameError(true);
      handleNotValid();
    } else if (e.target.value.length >= 2) {
      setIsNameError(false);
      handleValid();
    }
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    if (e.target.value.length < 2) {
      setIsDescriptionError(true);
      handleNotValid();
    } else if (e.target.value.length >= 2) {
      setIsDescriptionError(false);
      handleValid();
    }
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    if (currentUserInfo) {
      setName(currentUserInfo.name);
      setDescription(currentUserInfo.about);
    }
  }, [currentUserInfo, props.isOpen]);

  return (
    <PopupWithForm isValid={isFormValid} isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose} name="edit-profile" title="Редактировать профиль" buttonTitle="Сохранить" children={
      <>
        <div className="popup__wrap">
          <input required id="username-input" value={name || ''} onChange={handleNameChange} className="popup__input popup__username" name="name" placeholder="Имя" minLength="2" maxLength="40" />
          {isNameError && <span id="username-input-error" className="popup__error-text  popup__error-text_visible popup__error-text_username">{error}</span>}
        </div>
        <div className="popup__wrap">
          <input required id="bio-input" value={description || ''} onChange={handleDescriptionChange} className="popup__input popup__bio" name="about" placeholder="О себе" minLength="2" maxLength="200" />
          {isDescriptionError && <span id="bio-input-error" className="popup__error-text popup__error-text_visible popup__error-text_bio">{error}</span>}
        </div>
      </>
    }/>
  );
}

export default EditProfilePopup;