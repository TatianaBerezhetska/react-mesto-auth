import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ email }) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Место Россия" />
      <Route path="/sign-up">
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      </Route>
      <Route path="/sign-in">
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      </Route>
      <Route path="/feed">
        <div className="header__links">
          <p className="header__link">{email}</p>
          <Link className="header__link" to="/sign-in">
            Выйти
          </Link>
        </div>
      </Route>
    </header>
  );
}

export default Header;
