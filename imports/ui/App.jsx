import React from "react";
import { useTracker } from 'meteor/react-meteor-data';
import { Coin } from "./components/Coin";
import { Tosses } from "./components/Tosses";
import { AuthForm } from "./AuthForm";

export const App = () => {

  const user = useTracker(() => Meteor.user());

  const logout = () => Meteor.logout();

  return(
    <div>
      {user ? (
        <section className="coin-page">
          <Coin id={user._id}/>
          <Tosses id={user._id}/>
          <button className="button button-logout" onClick={() => logout()}>Выйти ({user.username})</button>
        </section>
      ) : (
        <section className="auth-page">
          <AuthForm login/>
          <AuthForm />
        </section>
      )}
    </div>
  )
};
