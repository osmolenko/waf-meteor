import React, { useState } from 'react';
import { tossCoin } from '../../api/Coins'
import { useTracker } from 'meteor/react-meteor-data';

export const Coin = (props) => {

    const [coinState, setCoinState] = useState();

    const toss = () => {
        setCoinState(Meteor.call("coin.toss", props.id));
    };

    return (
        <div>
            <div className={`coin-image ${coinState ? "heads" : "tails"}`}/>
            <p className="coin-state-text">{coinState ? "Орёл" : "Решка"}</p>
            <button className="button button-primary" onClick={() => toss()}>Подбросить монетку</button>
        </div>
    );
};
