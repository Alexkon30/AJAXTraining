let change = document.querySelector('#change')
let h2 = document.querySelector('h2')
let button = document.querySelector('button')
let message = document.querySelector('#message')
let form = document.querySelector('form')
let loginInput = document.querySelector('input[name="login"]')
let passwordInput = document.querySelector('input[name="password"]')
let logout = document.querySelector('#logout')
logout.remove();

change.addEventListener('click', changeMode);

function changeMode(event) {
  message.classList.add('hide');
  event.preventDefault();
  loginInput.value = '';
  passwordInput.value = '';
  if (form.dataset.mode == 'register') {
    form.dataset.mode = 'login';
    change.innerText = 'Sign up';
    h2.innerText = 'Sign in';
    button.innerText = 'Login';
  } else if (form.dataset.mode == 'login') {
    form.dataset.mode = 'register';
    change.innerText = 'Sign in';
    h2.innerText = 'Create new user';
    button.innerText = 'Register';
  }
}

function checkResponse(res, note) {
  if (res.ok === true) {
    document.location.href = 'http://localhost:3000/user';
  } else {
    message.innerText = note;
    message.classList.remove('hide');
    loginInput.value = '';
    passwordInput.value = '';
  }
}

async function fetchWithPostMethod(url, data) {
  let result = await fetch(url, {
    method: 'POST',
    headers: {
      //  'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return result;
}

button.addEventListener('click', (e) => {
  e.preventDefault();
  login(loginInput.value, passwordInput.value);
})

async function login(login, password) {
  if (form.dataset.mode == 'login') {
    checkResponse(await fetchWithPostMethod('/', { login, password }), 'Incorrect login or pass');
  } else if (form.dataset.mode == 'register') {
    checkResponse(await fetchWithPostMethod('/register', { login, password }), 'Unavailable username');
  }
}
