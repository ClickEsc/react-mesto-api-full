import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [placeName, setPlaceName] = React.useState('');
  const [placeLink, setPlaceLink] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [isPlaceNameError, setIsPlaceNameError] = React.useState(false);
  const [isPlaceLinkError, setIsPlaceLinkError] = React.useState(false);
  const [placeNameError, setPlaceNameError] = React.useState('');
  const [placeLinkError, setPlaceLinkError] = React.useState('');

  React.useEffect(() => {
    setIsFormValid(false);
    resetForm();
  }, [props.isOpen]);

  function handleValid() {
    if (document.querySelector('#place-name-input').value.length >= 2 && document.querySelector('#place-link-input').value.startsWith("http")) {
      setIsFormValid(true);
    }
  }

  function handlePlaceNameChange(e) {
    if (e.target.value.length < 2) {
      setIsPlaceNameError(true);
      setPlaceNameError('Поле не может содержать менее 2 символов');
      setIsFormValid(false);
    } else if (e.target.value.length >= 2) {
      setIsPlaceNameError(false);
      handleValid();
    }
    setPlaceName(e.target.value);
  }

  function handlePlaceLinkChange(e) {
    if (e.target.value.length < 2) {
      setIsPlaceLinkError(true);
      setPlaceLinkError('Введите URL');
      setIsFormValid(false);
    } else if (e.target.value.startsWith("http")) {
      setIsPlaceLinkError(false);
      handleValid();
    }
    setPlaceLink(e.target.value);
  }

  function resetForm() {
    setPlaceName('');
    setPlaceLink('');
    setIsPlaceNameError(false);
    setIsPlaceLinkError(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: placeName,
      link: placeLink
    });
    resetForm();
  }

  return (
    <PopupWithForm isValid={isFormValid} isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose} name="add-card" title="Новое место" buttonTitle="Создать">
      <div className="popup__wrap">
        <input required id="place-name-input" value={placeName || ''} onChange={handlePlaceNameChange} className="popup__input popup__place-name" name="name" placeholder="Название" minLength="1" maxLength="30" />
        {isPlaceNameError && <span id="place-name-input-error" className="popup__error-text popup__error-text_visible popup__error-text_place-name">{placeNameError}</span>}
      </div>
      <div className="popup__wrap">
        <input required id="place-link-input" value={placeLink || ''} onChange={handlePlaceLinkChange} type="url" className="popup__input popup__place-link" name="link" placeholder="Ссылка на картинку" />
        {isPlaceLinkError && <span id="place-link-input-error" className="popup__error-text popup__error-text_visible popup__error-text_place-link">{placeLinkError}</span>}
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;