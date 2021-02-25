import { Mongo } from 'meteor/mongo';

export const CoinCollection = new Mongo.Collection("coins");


 Meteor.methods({
   'coin.toss'(id) {
     if (!this.userId) {
       throw new Meteor.Error("No auth.")
     };

     let coin = Math.random() < 0.5; 

     CoinCollection.insert({
         coin: coin,
         createdAt: new Date(),
         userId: id
     });
   
     return coin;
   },

   'coin.list'(id) {
    if (!this.userId) {
      throw new Meteor.Error("No auth.")
    };

    return CoinCollection.find({userId: id}, { sort: { createdAt: -1 }, limit: 20}).fetch();

   }
 })

 if (Meteor.isServer) {
  Meteor.publish('coins', function() {
    return CoinCollection.find({
      $or: [
        { userId: this.userId }
      ]
    });
  })
}