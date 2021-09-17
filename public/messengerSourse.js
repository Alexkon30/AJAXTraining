//current page = /messenger
let mainElem = document.querySelector('main');
let chats = document.querySelectorAll('.chat');

for (let chat of chats) {
  chat.addEventListener('click', () => showChat(chat.dataset.friendid))
}

async function showChat(id) {
  let messagesList = [];
  let response = await fetch(`/messenger/${id}`);
  let messages = await response.json();

  for (let message of messages) {
    messagesList.push(`<div data-author="${message.type}"><p>${message.author}</p><p>${message.date}</p><p>${message.text}</p></div>`)
  }

  messagesList.push(`<div><textarea name="message"></textarea><button id="sendMessage">Send message</button></div>`);
  mainElem.innerHTML = messagesList.join('');

  let area = document.querySelector('textarea');
  //area.value = 'test'
  document.querySelector('#sendMessage').addEventListener('click', () => {
    //нужно как то передать id друга чтобы указать в какой диалог сохранять сообщения

    //есть id при вызове функции!! не тупи. Там как раз хранится id друга
  })


}
