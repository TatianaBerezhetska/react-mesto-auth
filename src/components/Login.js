import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="authorize">
      <h1 className="authorize__header">Вход</h1>
      <form className="authorize__form" onSubmit={handleSubmit}>
        <input
          className="authorize__input"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleEmailChange}
          value={email || ''}
        ></input>
        <input
          className="authorize__input"
          type="password"
          placeholder="Пароль"
          name="password"
          onChange={handlePasswordChange}
          value={password || ''}
        ></input>
        <button className="authorize__submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
