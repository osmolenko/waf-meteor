import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { CoinCollection } from '../../api/Coins';

export const Tosses = (props) => {
	const [tossesSkipCount, setTossesSkipCount] = useState(0);

	const tosses = useTracker(() =>
		CoinCollection.find(
			{ userId: props.id },
			{ sort: { createdAt: -1 }, limit: 20, skip: tossesSkipCount }
		).fetch()
	);

	const tossesCount = useTracker(() =>
		CoinCollection.find({ userId: props.id }).count()
	);

	const changeTossesCountHandler = (type) => {
		if (
			(tossesSkipCount - 20 < 0 && !type) ||
			(tossesSkipCount + 20 > tossesCount && type)
		) {
			console.error('No data.');
		} else {
			if (type) {
				setTossesSkipCount(tossesSkipCount + 20);
			} else {
				setTossesSkipCount(tossesSkipCount - 20);
			}
		}
	};

	return (
		<>
			{tosses.length ? (
				<table className='tosses-container'>
					<thead>
						<tr>
							<th className='tosses-text toss-type'>
								<b>Что выпало?</b>
							</th>
							<th className='tosses-text'>
								<b>Когда?</b>
							</th>
						</tr>
					</thead>
					<tbody>
						{tosses.map((toss, index) => (
							<tr key={index}>
								<td className='tosses-text toss-type'>
									{toss.coin ? 'Орёл' : 'Решка'}
								</td>
								<td className='tosses-text'>
									{toss.createdAt.toLocaleString('ru', {
										day: 'numeric',
										month: 'long',
										year: 'numeric',
										hour: 'numeric',
										minute: 'numeric',
										second: 'numeric',
									})}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>Вы ещё ни разу не бросили монетку 🙁</p>
			)}
			{tossesCount > 20 ? (
				<div className='pagination-container'>
					<button
						className={`pagination-button ${
							tossesSkipCount - 20 < 0
								? 'pagination-inactive'
								: 'pagination-active'
						}`}
						onClick={() => changeTossesCountHandler(false)}
					>
						ᐊ
					</button>
					<button
						className={`pagination-button ${
							Math.abs(tossesCount - tossesSkipCount) < 20
								? 'pagination-inactive'
								: 'pagination-active'
						}`}
						onClick={() => changeTossesCountHandler(true)}
					>
						ᐅ
					</button>
				</div>
			) : (
				''
			)}
		</>
	);
};
