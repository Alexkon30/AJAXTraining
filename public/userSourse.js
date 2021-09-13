let logout = document.querySelector('#logout');

logout.addEventListener('click', async (e) => {
  e.preventDefault();
  //console.log('logout')
  await fetch('http://localhost:3000/logout', {
    method: 'GET',
    headers: {
      //  'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: null,
  })
  document.location.href = 'http://localhost:3000/'
})
