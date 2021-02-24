import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { RegisterUser } from '../api/Users';

export const AuthForm = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = e => {
    e.preventDefault();

    if(props.login) {
      Meteor.loginWithPassword(username, password);
    } else {
      RegisterUser(username, password);
    }
    
  };


  return (
    <form onSubmit={submit} className="auth-form">
      <label htmlFor="username">Имя пользователя</label>

      <input
        type="text"
        placeholder="Username"
        name="username"
        required
        onChange={e => setUsername(e.target.value)}
      />

      <label htmlFor="password">Пароль</label>

      <input
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">{props.login ? 'Войти' : 'Зарегистрироваться'}</button>
    </form>
  );
};