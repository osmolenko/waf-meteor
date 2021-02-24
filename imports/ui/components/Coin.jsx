import React, { useState } from 'react';
import { tossCoin } from '../../api/Coins'

export const Coin = (props) => {
    const [coinState, setCoinState] = useState();

    const toss = () => {
        setCoinState(tossCoin(props.id));
    };

    return (
        <div>
            <p>{coinState ? "Орёл" : "Решка"}</p>
            <button onClick={() => toss()}>Подбросить монетку</button>
        </div>
    );
};
