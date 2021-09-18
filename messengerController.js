import User from './User.js';
import Dialog from './Dialog.js';
import Message from './Message.js'

class messengerController {
  async main(req, res) {
    if (req.session.auth) {
      User.findById(req.session.userId)
        .then(async user => {
          let chats = [];
          for (let friendId of user.friends) {
            let friend = await User.findById(friendId);
            friend.name = friend.name == '' ? `login: ${friend.login}` : friend.name;
            chats.push({ name: friend.name, id: friend.id })
          }
          res.render('messenger.hbs', {
            chats
          });
        })
        .catch(err => console.log(err.message));
    } else {
      res.redirect('/')
    }
  }

  async getChat(req, res) {
    if (req.session.auth) {
      let dialog = await Dialog.find({ users: { $all: [req.session.userId, req.params.id] } })
      let messages = await Message.find({ dialogId: dialog[0].id });
      //console.log(messages);
      for (let message of messages) {
        if (message.authorId == req.session.userId) {
          let user = await User.findById(req.session.userId);
          message.type = 'user-message';
          message.author = user.name == '' ? 'noName' : user.name;
        } else if (message.authorId == req.params.id) {
          let user = await User.findById(req.params.id);
          message.type = 'friend-message';
          message.author = user.name == '' ? 'noName' : user.name;
        }

        // !!! нестыковки в логике отправки новых сообщений и загрузке старых, надо менять логику
      }
      res.send(messages);
    } else {
      res.redirect('/')
    }
  }

  async sendMessage(req, res) {
    if (req.session.auth) {
      let dialog = await Dialog.find({ users: { $all: [req.session.userId, req.body.id] } })
      let now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      let date = now.getDate();
      let month = `${now.getMonth() + 1}`.length == 1 ? `0${now.getMonth() + 1}` : `${now.getMonth() + 1}`;
      let year = now.getFullYear();

      //console.log(dialog, dialog[0].id);
      let message = await Message.create({
        authorId: req.session.userId,
        author: req.session.userName,
        dialogId: dialog[0].id,
        text: req.body.text,
        date: `${hours}:${minutes}:${seconds} ${date}.${month}.${year}`
      })
      console.log(message)
      res.send(message);
    } else {
      res.redirect('/')
    }
  }
}

export default new messengerController();
