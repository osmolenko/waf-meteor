import { Mongo } from 'meteor/mongo';

export const CoinCollection = new Mongo.Collection("coins");

export function tossCoin(id) {
  let coin = Math.random() < 0.5; 

  CoinCollection.insert({
      coin: coin,
      createdAt: new Date(),
      userId: id
  });

  return coin;
}