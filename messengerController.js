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
      let messages = await Message.find({ dialogId: dialog.id }, { dialogId: 0 });
      console.log(messages);
      for (let message of messages) {
        if (message.authorId == req.session.userId) {
          let user = await User.findById(req.session.userId);
          message.type = 'user-message';
          message.author = user.name;
        } else if (message.authorId == req.params.id) {
          let user = await User.findById(req.params.id);
          message.type = 'friend-message';
          message.author = user.name;
        }
      }
      res.send(messages);
    } else {
      res.redirect('/')
    }
  }
}

export default new messengerController();
