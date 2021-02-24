import React, { useState } from 'react';
import { tossCoin } from '../../api/Coins'

export const Coin = (props) => {
    const [coinState, setCoinState] = useState();

    const toss = () => {
        setCoinState(tossCoin(props.id));
    };

    return (
        <div>
            <div className={`coin-image ${coinState ? "heads" : "tails"}`}/>
            <p className="coin-state-text">{coinState ? "Орёл" : "Решка"}</p>
            <button className="button button-primary" onClick={() => toss()}>Подбросить монетку</button>
        </div>
    );
};
