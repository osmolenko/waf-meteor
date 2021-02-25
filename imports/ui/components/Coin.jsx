import React, { useState } from 'react';

export const Coin = (props) => {
	const [coinState, setCoinState] = useState();
	const [error, setError] = useState();

	const toss = () => {
		setCoinState(
			Meteor.call('coin.toss', props.id, (err) => {
				if (err) {
					setError(err);
				} else {
					setError('');
				}
			})
		);
	};

	return (
		<div>
			<div className={`coin-image ${coinState ? 'heads' : 'tails'}`} />
			<p className="coin-state-text">{coinState ? 'Орёл' : 'Решка'}</p>
			<button className="button button-primary" onClick={() => toss()}>
				Подбросить монетку
			</button>
			{error ? <span className="error">{error.error}</span> : ''}
		</div>
	);
};
