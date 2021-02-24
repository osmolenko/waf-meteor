import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { CoinCollection } from '../../api/Coins';

export const Tosses = (props) => {

  const tosses = useTracker(() => CoinCollection.find({userId: props.id}, { sort: { createdAt: -1 }}).fetch())

    return (
        <div>
            {tosses.map((toss, index) => (
              <div key={index}>
                <p>{toss.coin ? "Орёл" : "Решка"}</p>
                <p>{toss.createdAt.toLocaleString()}</p>
              </div>
            ))}
        </div>
    );
};