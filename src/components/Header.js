import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ email }) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Место Россия" />
      <Route path="/signup">
        <Link className="header__link" to="/signin">
          Войти
        </Link>
      </Route>
      <Route path="/signin">
        <Link className="header__link" to="/signup">
          Регистрация
        </Link>
      </Route>
      <Route path="/feed">
        <div className="header__links">
          <p className="header__link">{email}</p>
          <Link className="header__link" to="/signin">
            Выйти
          </Link>
        </div>
      </Route>
    </header>
  );
}

export default Header;
