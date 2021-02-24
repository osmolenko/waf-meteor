import { Accounts } from 'meteor/accounts-base';

export const RegisterUser = (username, password) => {
  Accounts.createUser({
    username: username,
    password: password
  }, function(error){
    console.log(error)
    if(error) return error;
  });
}