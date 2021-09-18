//current page = /messenger
let mainElement = document.querySelector('main');
let chats = document.querySelectorAll('.chat');

for (let chat of chats) {
  chat.addEventListener('click', () => showChat(chat.dataset.friendid))
}

async function showChat(id) {
  let messagesList = [];
  let response = await fetch(`/messenger/${id}`);
  let messages = await response.json();

  let messageContainer = '<div id="message-container"></div>';
  let buttonHTML = `<div><textarea name="message"></textarea><button id="sendMessage">Send message</button></div>`;
  mainElement.innerHTML = messageContainer + buttonHTML;

  let dialog = document.querySelector('#message-container');
  let area = document.querySelector('textarea');

  for (let message of messages) {
    messagesList.push(`<div data-author="${message.type}" class="message"><p>${message.author}</p><p>${message.date}</p><p>${message.text}</p></div>`)
  }

  dialog.innerHTML = messagesList.join('');


  //area.value = 'test'
  document.querySelector('#sendMessage').addEventListener('click', async function send() {
    let sendMessage = await fetch('/messenger', {
      method: 'POST',
      headers: {
        //  'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: area.value,
        id,
      })
    })

    if (sendMessage.ok) {
      let message = await sendMessage.json();
      messagesList.push(`<div data-author="user-message" class="message"><p>${message.author}</p><p>${message.date}</p><p>${message.text}</p></div>`)
      dialog.innerHTML = messagesList.join('');
      area.value = '';
    }
  })


}
