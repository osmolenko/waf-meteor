import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';

export const AuthForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = e => {
    e.preventDefault();

    if(props.login) {
      Meteor.loginWithPassword(username, password, function(err) {
        if(err) setError(err)
      });
    } else { 
      Accounts.createUser({
        username: username,
        password: password
      }, function(err){
        if(err) setError(err);
      });
    }
  };


  return (
    <div className={props.login ? "login-container" : "register-container"}>
      <h3 className="auth-header">{props.login ? "Авторизация" : "Регистрация"}</h3>
      <form onSubmit={submit} className="auth-form">
        <label htmlFor="username" className="label-form">Имя пользователя</label>

        <input
          type="text"
          placeholder="Username"
          name="username"
          required
          className="input-form"
          onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor="password" className="label-form">Пароль</label>

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          className="input-form"
          onChange={e => setPassword(e.target.value)}
        />
        {error ? <span className="error">{error.reason}</span>: ""}
        <button type="submit" className="button button-primary">{props.login ? 'Войти' : 'Зарегистрироваться'}</button>
      </form>
    </div>
  );
};