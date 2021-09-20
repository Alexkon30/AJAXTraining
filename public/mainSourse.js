const change = document.querySelector('#change')
const h2 = document.querySelector('h2')
const button = document.querySelector('button')
const message = document.querySelector('#message')
const form = document.querySelector('form')
const loginInput = document.querySelector('input[name="login"]')
const passwordInput = document.querySelector('input[name="password"]')
const logout = document.querySelector('#logout')
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

function checkResponse(result, note) {
  if (result.ok) {
    // console.log(result);
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
      //'Authorization': 'Bearer ${response.token}'
    },
    body: JSON.stringify(data),
  })
  console.log(result);
  //let response = await result.json();
  //console.log(response);
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
