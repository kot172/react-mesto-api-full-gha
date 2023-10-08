import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace, isSend}) {
  const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

  function resetForClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddPlace({place: values.place, link: values.link}, reset)
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      titleButton="Создать"
      isOpen={isOpen}
      onClose={resetForClose}
      isValid = {isValid}
      onSubmit = {handleSubmit}
      isSend={isSend}
    >
      <input
        placeholder="Название"
        id="place"
        name="place"
        className={`popup__field popup__field_type_place ${isInputValid.place === undefined || isInputValid.place ? '' : 'popup__error-active'}`}
        type="text"
        minLength={2}
        maxLength={30}
        required=""
        value={values.place ? values.place : ''}
        disabled={isSend}
        onChange={handleChange}
      />
      <span id="form_place_input" className="popup__error place-error">{errors.place}</span>
      <input
        placeholder="Ссылка на картинку"
        id="link"
        name="link"
        className={`popup__field popup__field_type_link ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__error-active'}`}
        type="url"
        required=""
        value={values.link ? values.link : ""}
        disabled={isSend}
        onChange={handleChange}
      />
      <span id="form_link_input" className="popup__error link-error">{errors.link}</span>
    </PopupWithForm>
  )
}
