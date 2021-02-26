#  Available Scripts
##  `yarn start`
Runs server and client simultaneously in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
##  `yarn test`
Launches the test runner in the interactive watch mode.
##  `yarn build`
Builds production image to the `output` folder.
#  How it's made?
##  Authorization
We're using [Accounts-base](https://atmospherejs.com/meteor/accounts-base) package to authorize and register users. This package implements the basic functions necessary for user accounts.
###  Register
```Accounts.createUser({username,password},function (err) {}```
###  Login
```Meteor.loginWithPassword(username, password, function (error) {}```
###  Logout
```Meteor.logout()```
###  Error handling
[Accounts-base](https://atmospherejs.com/meteor/accounts-base) package throws **Meteor.Error** but only in English. We're using **errorHandler.js** to translate error messages and return them to user.
```
switch (reason) {
case 'Incorrect password':
return 'Неверный пароль.';
```
##  Coin tossing
Coin toss must be implemented on server side so we're are calling **'coin.toss' Meteor Method** that returns and insert in database coin state.
###  Heads or tails?
**Math.random()** returns float value from 0 to 1, so we compare `Math.random() < 0.5` to obtain 50% chance of getting heads.
###  Insert data into MongoDB
```
CoinCollection.insert({
coin: (true / false),
createdAt: new Date(),
userId: this.userId,
});
```
###  Animate tossing
In **Coin** component we have 2 images one of which is visible to the user. If **coinState** changes **display:none** is added to styles of one picture, **display: block** to styles of another. Both of them have **animation: tosscoin 0.2s** property.
```
@keyframes tosscoin {
  from { transform: rotateY(180deg); }
  to { transform: rotateY(0); }
}
```
##  Tosses list
To show the list of tossings we request 2 types of data from the database.
 - List of tosses limited to 20 pieces.
 - Number of tosses by user.
###  Tosses list in GUI
We display tosses list only if there's at least 1 record in DB and simply **.map** the array.
###  Pagination
Display only if there's at least 20 records in DB.
 - Previous page check: `tossesSkipCount - 20 < 0`
 - Next page check: `Math.abs(tossesCount - tossesSkipCount) < 20`
If one of the fail checks, the corresponding button acquires **className: pagination-inactive** and changes its appearance.
