import { CoinCollection } from '../imports/api/Coins';
import { Meteor } from 'meteor/meteor'
import assert from 'assert';
import { resetDatabase } from 'meteor/xolvio:cleaner';


if (Meteor.isClient) {

  describe('Test', function () {

    resetDatabase()

    it('You can register', function () {

      Accounts.createUser(
				{
					username: 'test',
					password: 'test',
				},
				function (err) {
					if (err) throw err;
				}
			);

      Meteor.logout();

    })

    it('You can login', function () {

      Meteor.loginWithPassword('test', 'test', function (err) {
				if (err) throw new Meteor.Error(err);
			});

      Meteor.logout();

    })
  
    it('You can toss a coin with login', function () {

      Meteor.loginWithPassword('test', 'test', function (err) {
				if (err) console.error(err);
			});
  
      Meteor.call('coin.toss', (err, result) => {
        if (!err) {
          assert.strictEqual(result, true | false) 
        }
      });
  
      Meteor.logout();
  
    });

    it('You cannot toss a coin without login', function () {
  
      Meteor.call('coin.toss', (err) => {
        if (err) assert.strictEqual(err.error, 'No auth.')
      });  
  
    });

  });
}




