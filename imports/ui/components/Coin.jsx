import React, { useState } from 'react';

export const Coin = () => {
	const [coinState, setCoinState] = useState();
	const [error, setError] = useState();

	const toss = () => {
		Meteor.call('coin.toss', (err, res) => {
			if (err) {
				setError(err);
			} else {
				setError('');
				setCoinState(res);
			}
		});
	};

	return (
		<div>
			<img
				src='heads.png'
				className={`coin-image ${coinState ? 'image-none' : ''}`}
			/>
			<img
				src='tails.png'
				className={`coin-image ${!coinState ? 'image-none' : ''}`}
			/>
			<p className='coin-state-text'>{coinState ? 'Орёл' : 'Решка'}</p>
			<button className='button button-primary' onClick={() => toss()}>
				Подбросить монетку
			</button>
			{error ? <span className='error'>{error.error}</span> : ''}
		</div>
	);
};
