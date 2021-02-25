import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { errorHandler } from '../common/errorHandler';

export const AuthForm = (props) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isLogin, setIsLogin] = useState(true);

	const submit = (e) => {
		e.preventDefault();

		if (isLogin) {
			Meteor.loginWithPassword(username, password, function (err) {
				if (err) setError(errorHandler(err.reason));
			});
		} else {
			Accounts.createUser(
				{
					username: username,
					password: password,
				},
				function (err) {
					if (err) setError(errorHandler(err.reason));
				}
			);
		}
	};

	return (
		<div>
			<h3 className='auth-header'>
				{isLogin ? 'Авторизация' : 'Регистрация'}
			</h3>
			<form onSubmit={submit} className='auth-form'>
				<label htmlFor='username' className='label-form'>
					Имя пользователя
				</label>

				<input
					type='text'
					placeholder='Имя пользователя'
					name='username'
					required
					className='input-form'
					onChange={(e) => setUsername(e.target.value)}
				/>

				<label htmlFor='password' className='label-form'>
					Пароль
				</label>

				<input
					type='password'
					placeholder='Пароль'
					name='password'
					required
					className='input-form'
					onChange={(e) => setPassword(e.target.value)}
				/>
				{error ? <span className='error'>{error}</span> : ''}
				<button type='submit' className='button button-primary'>
					{isLogin ? 'Войти' : 'Зарегистрироваться'}
				</button>
			</form>
			<p className='label-form auth-question'>{isLogin ? 'Нет аккаунта?' : 'Есть аккаунт?'}</p>
			<button className='button button-secondary auth-button' onClick={() => isLogin ? setIsLogin(false) : setIsLogin(true)}>{isLogin ? 'Зарегистрироваться' : 'Войти'}</button>
		</div>
	);
};
