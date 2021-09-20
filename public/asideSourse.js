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
      return `<div><a href="#" data-client_id="${user.clientId}" class="people-users">${user.clientName}</a></div>`
    })
    .join('');
  mainElem.innerHTML = listOfDialogs;

  let peopleLinks = document.querySelectorAll('.people-users');
  for (let link of peopleLinks) {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      let result = await fetch('/user/people/' + link.dataset.client_id, {
        //method: "GET",
        //headers: { "Accept": "application/json" },
      })

      let man = await result.json();
      let manStats = [];
      for (let item in man) {
        if (item != 'isFriend' && item != 'id') {
          manStats.push(`<div><p>${item}:${man[item]}</p></div>`);
        }
      }
      if (!man.isFriend) {
        manStats.push(`<div><button id="toFriends">Add to friends</button></div>`);
      } else {
        manStats.push(`<div><button id="toFriends">Remove from friends</button></div>`);
      }
      mainElem.innerHTML = manStats.join('');

      let addFriendsButton = document.querySelector('#toFriends');
      if (!man.isFriend) {
        addFriendsButton.addEventListener('click', addToFriends);
      } else {
        addFriendsButton.addEventListener('click', removeFromFriends);
      }


      async function addToFriends() {
        let result = await fetch('/user/people/add/' + man.id)
        if (result.ok) {
          addFriendsButton.innerText = 'Delete from friends';
          addFriendsButton.removeEventListener('click', addToFriends);
          addFriendsButton.addEventListener('click', removeFromFriends);
        }
      }

      async function removeFromFriends() {
        let result = await fetch('/user/people/delete/' + man.id)
        if (result.ok) {
          addFriendsButton.innerText = 'Add to friends';
          addFriendsButton.addEventListener('click', addToFriends);
          addFriendsButton.removeEventListener('click', removeFromFriends);
        }
      }
    })
  }
})

settingsLink.addEventListener('click', async (e) => {
  e.preventDefault();
  await fetch('/user/getSettings')
    .then(result => result.json())
    .then(client => {
      let resArr = [];
      for (let part in client) {
        if (part != 'birthday') {
          resArr.push(
            `<div>${part}:<input value="${client[part]}" class="stats" data-statelem="${part}"></div>`
          )
        }
      }
      resArr.push(`<div>birthday:<input value="${client.birthday.split('.').reverse().join('-')}" class="stats" data-statelem="birthday"></div>`);
      resArr.push('<div><button id="save">Save</button></div>');
      resArr.push('<div><button id="delete">Delete account</button></div>')
      mainElem.innerHTML = resArr.join('')
      document.querySelector('input[data-statelem="birthday"]').type = 'date';

      let save = document.querySelector('#save');
      save.addEventListener('click', async () => {
        let statsObj = {};
        document.querySelectorAll('.stats')
          .forEach(stat => {
            if (stat.dataset.statelem != 'login') {
              statsObj[stat.dataset.statelem] = stat.value
            }
          })

        if (statsObj.birthday != '') {
          let [year, month, day] = statsObj.birthday.split('-');
          statsObj.birthday = statsObj.birthday.split('-').reverse().join('.')
          let birthDate = new Date(year, month - 1, day)
          statsObj.age = ((Date.now() - birthDate) / (1000 * 60 * 60 * 24 * 365)).toFixed();
        }

        let response = await fetch('/user/setSettings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(statsObj),
        })

        if (response.ok) {
          document.location.href = 'http://localhost:3000/user'
        }
      })
    })
    .catch(err => console.log(err.message))

  document.querySelector('#delete').addEventListener('click', async () => {
    let response = await fetch('/user/deleteUser')

    if (response.ok) {
      document.location.href = 'http://localhost:3000/'
    }
  })
})

//проверить будет ли ссылка из хедера работать с других рендеров
