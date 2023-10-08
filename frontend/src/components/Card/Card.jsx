import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext.js";
import BtnLike from "../BtnLike/BtnLike.jsx";

export default function Card({ card, onCardClick, onClose, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="element">
      <img
        className="element__mask-group"
        src={card.link}
        alt={`Изображение ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      {currentUser._id === card.owner && (
        <button
          type="button"
          className="element__delete"
          onClick={() => onDelete(card._id)}
        />
      )}

      <div className="element__main">
        <h2 className="element__main-text">{card.name}</h2>
        <div className="element__likes">
          <BtnLike
            likes={card.likes}
            myid={currentUser._id}
            cardid={card._id}
          />
        </div>
      </div>
    </div>
  );
}
