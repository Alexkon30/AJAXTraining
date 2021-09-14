//current page = /user
const peopleLink = document.querySelector('#peopleLink');
const messengerLink = document.querySelector('#messengerLink');
const settingsLink = document.querySelector('#settingsLink');
const mainElem = document.querySelector('main')

peopleLink.addEventListener('click', async (e) => {
  e.preventDefault();
  let result = await fetch('/user/people', {
    //method: "GET",
    //headers: { "Accept": "application/json" },
  })
  let peopleList = await result.json();
  let listOfDialogs = peopleList
    .map(user => {
      return `<div><a href="#" dataset="${user.clientId}">chat with ${user.clientName}</a></div>`
    })
    .join('');
  mainElem.innerHTML = listOfDialogs;
})

messengerLink.addEventListener('click', (e) => {
  e.preventDefault();
})

settingsLink.addEventListener('click', (e) => {
  e.preventDefault();
})

//проверить будет ли ссылка из хедера работать с других рендеров
