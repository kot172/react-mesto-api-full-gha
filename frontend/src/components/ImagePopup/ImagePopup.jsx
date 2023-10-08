import { usePopupClose } from "../../hooks/usePopupClose";

export default function ImagePopup({ card, isOpen, onClose }) {
  usePopupClose(card?.link, onClose);

  return (
    <div
      className={`popup popup__overlay_dark images-popup ${
        isOpen && "popup_opened"
      }`}
    >
      <div className="popup__container popup__container_image">
        <button
          className="popup__button-exit popup__button-exit_image"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__image"
          src={card.link}
          alt={`Изображение ${card.name}`}
        />
        <h2 className="popup__heading popup__heading_image">{card.name} </h2>
      </div>
    </div>
  );
}
