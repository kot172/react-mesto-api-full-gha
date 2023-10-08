import { Link } from "react-router-dom";
import React, { useState } from "react";
import logo from "../../images/logo.svg";
import { useLocation } from "react-router-dom";
import burger from "../../images/burger.svg";
import close from "../../images/CloseBurger.svg";

export default function Header({ email, onLogout }) {
  const [menu, setMenu] = useState(false);

  function handleOpenMenu() {
    setMenu(!menu);
  }

  const location = useLocation();

  return (
    <header className={menu ? "header header__active" : "header"}>
      <img className="header__logo" src={logo} alt="лого" />
      <div className={menu ? "header__info-burger" : "header__info"}>
        {location.pathname === "/signup" && (
          <>
            <Link className="header__logout" to="/signup" onClick={onLogout}>
              Зарегистрироваться
            </Link>
          </>
        )}
        {location.pathname === "/" && (
          <>
            <p className={menu ? "header__burger-active " : "header__email"}>
              {email}
            </p>
            <Link
              className={menu ? "header__logout" : "header__logout-off"}
              to="/signin"
              onClick={onLogout}
            >
              Выйти
            </Link>
          </>
        )}
        {location.pathname === "/signin" && (
          <>
            <Link className="header__logout" to="/signup" onClick={onLogout}>
              Регистрация
            </Link>
          </>
        )}
      </div>
      {location.pathname === "/" && (
        <>
          <div className="header__burger" onClick={handleOpenMenu}>
            {menu ? (
              <img src={close} alt="закрыть меню" />
            ) : (
              <img src={burger} alt="открыть меню" />
            )}
          </div>
        </>
      )}
    </header>
  );
}
