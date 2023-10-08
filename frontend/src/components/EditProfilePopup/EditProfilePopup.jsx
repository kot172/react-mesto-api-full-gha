import { useContext, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSend }) {
const currentUser = useContext(CurrentUserContext)
const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()

useEffect(() => {
  setValue("name", currentUser.name)
  setValue("job", currentUser.about)
},[currentUser, setValue])

function resetForClose() {
  onClose()
  reset({ name: currentUser.name, job: currentUser.about})
}

function handleSubmit(evt) {
  evt.preventDefault()
  onUpdateUser({ name:values.name, job: values.job}, reset)
}

    return(
        <PopupWithForm 
  name='edit-profile'
  title='Редактировать профиль'
  isOpen = {isOpen}
  onClose = {resetForClose}
  isValid = {isValid}
  isSend={isSend}
  onSubmit = {handleSubmit}
  >
          <input
            id="name"
            placeholder="Имя"
            name="name"
            className={`popup__field popup__field_type_name ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__error-active'} `}
            type="text"
            minLength={2}
            maxLength={40}
            required=""
            value = {values.name ? values.name : ''}
            disabled = {isSend}
            onChange = {handleChange}
          />
          <span id="form_name_input" className="popup__error name-error">{errors.name}</span>
          <input
            id="job"
            name="job"
            placeholder="О себе"
            className={`popup__field popup__field_type_job ${isInputValid.job === undefined || isInputValid.job ? '' : 'popup__error-active'} `}
            type="text"
            minLength={2}
            maxLength={200}
            required=""
            disabled = {isSend}
            value = {values.job ? values.job : ''}
            onChange = {handleChange}
          />
          <span id="form_job_input" className="popup__error job-error">{errors.job}</span>
  </PopupWithForm>
    )
}