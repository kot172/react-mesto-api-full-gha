import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ register }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formValue.email, formValue.password);
  };

  return (
    <div>
      <div className="auth__info">
        <p className="auth__heading">Регистрация</p>
        <form onSubmit={handleSubmit} className="auth__form">
          <input
            className="login auth__input"
            name="email"
            type="email"
            onChange={(event) =>
              setFormValue({ ...formValue, email: event.target.value })
            }
            value={formValue.email}
            placeholder="Email"
          ></input>
          <input
            className="password auth__input"
            name="password"
            type="password"
            onChange={(event) =>
              setFormValue({ ...formValue, password: event.target.value })
            }
            value={formValue.password}
            placeholder="Пароль"
          ></input>
          <button className="auth__btn" type="submit">
            Зарегистрироваться
          </button>
          <p className="auth__signin">
            Уже зарегистрированы?{" "}
            <Link to="/signin" className="auth__link">
              {" "}
              Войти
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
