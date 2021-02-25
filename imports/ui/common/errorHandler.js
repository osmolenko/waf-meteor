export function errorHandler(reason){
  switch (reason) {
    case 'Incorrect password':
      return 'Неверный пароль.';
    case 'User not found':
      return 'Пользователь не найден.'
    case 'Username already exists.':
      return 'Пользователь с таким именем уже зарегистрирован.'
    default:
      console.error(reason);
      return 'Неизвестная ошибка. Сообщите администратору.'
  }
}