import { useContext } from "react";
import Card from "../Card/Card.jsx";
import CurrentUserContext from "../../context/CurrentUserContext";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__capture">
          <button
            type="button"
            className="profile__avatar-edit"
            onClick={onEditAvatar}
          />
          <img
            className="profile__avatar"
            src={currentUser.avatar ? currentUser.avatar : "#"}
            alt="аватарка"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">
            {currentUser.name ? currentUser.name : ""}
          </h1>
          <button
            type="button"
            aria-label="edit"
            className="profile__edit-button"
            onClick={onEditProfile}
          />
          <p className="profile__job">
            {currentUser.about ? currentUser.about : ""}
          </p>
        </div>
        <button
          type="button"
          aria-label="add"
          className="profile__rectangle"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        {cards.map((data) => {
          return (
            <Card
              key={data._id}
              card={data}
              onCardClick={onCardClick}
              onDelete={onDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
