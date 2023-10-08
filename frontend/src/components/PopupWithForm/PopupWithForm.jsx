import { usePopupClose } from "../../hooks/usePopupClose";

export default function PopupWithForm({
  name,
  title,
  titleButton,
  children,
  isOpen,
  onClose,
  deleteCard,
  isSend,
  isValid = true,
  onSubmit,
}) {
  usePopupClose(isOpen, onClose);

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={onClose}
    >
      <div
        className="popup__container"
        onClick={(evt) => evt.stopPropagation()}
      >
        <button
          className="popup__button-exit popup__button-exit_profile"
          aria-label="exit"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__heading">{title}</h2>
        <form name={name} className="popup__info" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            aria-label="save"
            className={`popup__button-save ${
              isValid ? "" : "popup__button_disabled"
            }`}
          >
            {isSend ? "Ожидайте..." : titleButton || "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
}
