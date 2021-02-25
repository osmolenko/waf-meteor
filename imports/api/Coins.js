import { Mongo } from 'meteor/mongo';

export const CoinCollection = new Mongo.Collection('coins');

Meteor.methods({
	'coin.toss'(id) {
		if (!this.userId) {
			throw new Meteor.Error('No auth.');
		}

		const coin = Math.random() < 0.5;

		CoinCollection.insert({
			coin,
			createdAt: new Date(),
			userId: id,
		});

		return coin;
	},
});
