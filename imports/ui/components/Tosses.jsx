import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { CoinCollection } from '../../api/Coins';

export const Tosses = (props) => {

  const tosses = useTracker(() => CoinCollection.find({userId: props.id}, { sort: { createdAt: -1 }, limit: 20}).fetch())

    return (
        <table className="tosses-container">
          <thead>
            <tr>
              <th className="tosses-text toss-type"><b>Что выпало?</b></th>
              <th className="tosses-text"><b>Когда?</b></th>
            </tr>
          </thead>
          <tbody>
            {tosses.map((toss, index) => (
              <tr key={index}>
                <td className="tosses-text toss-type">{toss.coin ? "Орёл" : "Решка"}</td>
                <td className="tosses-text">{toss.createdAt.toLocaleString("ru", {day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric"})}</td>
              </tr>
            ))}
          </tbody>
        </table>
    );
};