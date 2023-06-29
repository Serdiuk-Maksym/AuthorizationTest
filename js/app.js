// Импортируем Firebase и его модули аутентификации
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Инициализируем Firebase с настройками вашего проекта
const firebaseConfig = {
  apiKey: 'Ваш API-ключ',
  authDomain: 'Ваш домен авторизации',
  // Другие настройки проекта Firebase...
};

initializeApp.initializeApp(firebaseConfig);

// Получаем доступ к модулю аутентификации
const auth = getAuth.auth();

// Функция для регистрации пользователя
function register(email, password) {
  return auth.createUserWithEmailAndPassword(email, password);
}

// Функция для входа пользователя
function login(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

// Обработчик события при отправке формы авторизации
document.getElementById('auth-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const action = document.querySelector('input[name="action"]:checked').value;

  if (action === 'login') {
    login(email, password)
      .then((userCredential) => {
        // Успешный вход
        const user = userCredential.user;
        console.log('Пользователь вошел:', user);
      })
      .catch((error) => {
        // Обработка ошибок при входе
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Ошибка входа:', errorCode, errorMessage);
      });
  } else if (action === 'register') {
    register(email, password)
      .then((userCredential) => {
        // Успешная регистрация
        const user = userCredential.user;
        console.log('Пользователь зарегистрирован:', user);
      })
      .catch((error) => {
        // Обработка ошибок при регистрации
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Ошибка регистрации:', errorCode, errorMessage);
      });
  }
});
