import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  const [isFormValid, setIsFormValid] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isErrorShown, setIsErrorShown] = React.useState(false);

  function handleAvatarInputChange() {
    if (avatarRef.current.value.length >= 2 && avatarRef.current.value.startsWith("http")) {
      setIsFormValid(true);
      setError('');
    } else if (avatarRef.current.value.length <= 2 || !avatarRef.current.value.startsWith("http")) {
      setError('Введите URL');
      setIsErrorShown(true);
      setIsFormValid(false);
    }
  }

  function resetForm() {
    avatarRef.current.value = '';
    setIsErrorShown(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    resetForm();
    setIsErrorShown(false);
  }

  function onClose() {
    resetForm();
    document.querySelector(".popup__save").setAttribute("disabled", "true");
    props.onClose();
  }

  return (
    <PopupWithForm isValid={isFormValid} isOpen={props.isOpen} onSubmit={handleSubmit} onClose={onClose} name="load-avatar" title="Обновить аватар" buttonTitle="Сохранить" children={
      <>
        <div className="popup__wrap">
          <input required onChange={handleAvatarInputChange} minLength="2" maxLength="200" id="avatar-link-input" type="url" ref={avatarRef} className="popup__input popup__avatar-link" name="avatar" placeholder="Ссылка на картинку" />
          {isErrorShown && <span id="avatar-link-input-error" className="popup__error-text popup__error-text_visible popup__error-text_avatar-link">{error}</span>}
        </div>
      </>
    }/>
  );
}

export default EditAvatarPopup;