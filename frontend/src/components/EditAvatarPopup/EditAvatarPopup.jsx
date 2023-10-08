import { useRef } from "react";
import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isSend}) {
    const input = useRef()
    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()


    function resetForClose() {
        onClose()
        reset()
      }

      function handleSubmit(evt) {
        evt.preventDefault()
        onUpdateAvatar({avatar: input.current.value}, reset)
      }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      isSend={isSend}
      isValid={isValid}
      onClose={resetForClose}
      onSubmit={handleSubmit}
    >
      <input
      ref = {input}
        placeholder="Ссылка на картинку"
        id="avatar"
        name="avatar"
        type="url"
        required=""
        className={`popup__field popup__field_type_avatar ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__error-active'}`}
        value={values.avatar ? values.avatar : ''}
        disabled={isSend}
        onChange={handleChange}
        
      />
      <span id="form_avatar_input" className="popup__error avatar-error">{errors.avatar}</span>
    </PopupWithForm>
  );
}
