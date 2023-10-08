import onreg from "../../images/onreg.svg";
import offreg from "../../images/offreg.svg";

function InfoTooltip({ isOpen, onClose, isConfirmed }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__button-exit"
          aria-label="exit"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__tooltip"
          src={isConfirmed ? onreg : offreg}
          alt={isConfirmed ? "Галочка" : "Крестик"}
        />
        <h2 className="popup__tootltip-header">
          {isConfirmed
            ? "Вы успешно зарегистрировались"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
