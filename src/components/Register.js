import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({onRegisterUser}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegisterUser(email, password);
  };

  return (
    <>
    <div className="authorize">
      <h1 className="authorize__header">Регистрация</h1>
      <form className="authorize__form" onSubmit={handleSubmit}>
        <input className="authorize__input" onChange={handleEmailChange} type="type" placeholder="Email" name="email"></input>
        <input className="authorize__input" onChange={handlePasswordChange} type="password" placeholder="Пароль" name="password"></input>
        <button className="authorize__submit" type="submit">Зарегистрироваться</button>
      </form>
      <div className="authorize__redirect">
      <p>Уже зарегистрированы?</p>
      <Link className="authorize__link" to="/sign-in"> Войти</Link>
      </div>
    </div>
    
    </>
  );
}

export default Register;
