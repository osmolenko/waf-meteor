import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { CoinCollection } from '../imports/api/Coins';

function insertCoinState({ coin, user }) {
	CoinCollection.insert({
		coin,
		userId: user._id,
		createdAt: new Date(),
	});
}

const MOCKUP_USERNAME = 'user';
const MOCKUP_PASSWORD = 'user';

Meteor.startup(() => {
	if (!Accounts.findUserByUsername(MOCKUP_USERNAME)) {
		Accounts.createUser({
			username: MOCKUP_USERNAME,
			password: MOCKUP_PASSWORD,
		});
	}

	const user = Accounts.findUserByUsername(MOCKUP_USERNAME);

	if (CoinCollection.find().count() === 0) {
		insertCoinState({
			coin: true,
			user,
		});
	}
});
