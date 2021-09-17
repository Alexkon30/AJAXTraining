import User from './User.js';
import Dialog from './Dialog.js';

class userController {
  main(req, res) {
    if (req.session.auth) {
      User.findById(req.session.userId)
        .then(result => {
          res.render('user.hbs', {
            user: result.toJSON(),
          })
        })
        .catch(err => console.log(err.message));
    } else {
      res.redirect('/')
    }
  }

  people(req, res) {
    if (req.session.auth) {
      User.find({})
        .then(result => {
          let users = result
            .filter(elem => elem._id != req.session.userId)
            .map(elem => {
              return {
                clientName: elem.login,
                clientId: elem._id.toString(),
              }
            });
          res.send(users)
        })
        .catch(err => console.log(err.message));
    } else {
      res.redirect('/')
    }
  }

  getSettings(req, res) {
    if (req.session.auth) {
      User.findById(req.session.userId)
        .then(result => {
          //let client = Object.assign({}, result.toJSON())
          let client = {
            name: result.name,
            surname: result.surname,
            birthday: result.birthday,
          }
          res.send(client)
        })
        .catch(err => console.log(err.message));
    }
  }

  setSettings(req, res) {
    if (req.session.auth) {
      User.findByIdAndUpdate(req.session.userId, req.body)
        .then(() => res.send())
        .catch(err => console.log(err.message));
    }
  }

  deleteUser(req, res) {
    if (req.session.auth) {
      User.findByIdAndDelete(req.session.userId)
        .then(() => {
          req.session.auth = false;
          req.session.userId = null;
          res.send()
        })
        .catch(err => console.log(err.message));
    }
  }

  getUserPage(req, res) {
    let friendsNames = [];
    let client = {};

    User.findById(req.params.id)
      .then(async result => {
        client = {
          'Date of registration': result.dateOfRegistration,
          Birthday: result.birthday,
          Name: result.name,
          Surname: result.surname,
          Age: result.age,
          isFriend: result.friends.includes(req.session.userId),
          id: result._id.toString(),
        }

        for (let friendId of result.friends) {
          let user = await User.findById(friendId)
          friendsNames.push(user.name)
        }

        client['Friends'] = friendsNames.join(',');
        res.send(client)
      })
      .catch(err => console.log(err.message));
  }

  addToFriends(req, res) {
    User.findById(req.session.userId)
      .then(result => {
        if (!result.friends.includes(req.params.id)) {
          result.friends.push(req.params.id);
          result.save();

          User.findById(req.params.id)
            .then(newFriend => {
              newFriend.friends.push(req.session.userId);
              newFriend.save();
            })
        }
      })
      .then(async () => {
        let dialog = await Dialog.find({ users: [req.params.id, req.session.userId] })
        if (dialog.length == 0) {
          let newDialog = await Dialog.create({ users: [req.params.id, req.session.userId] })
        }
        res.send()
      })
      .catch(err => console.log(err.message));
  }

  removeFromFriends(req, res) {
    User.findById(req.session.userId)
      .then(result => {
        if (result.friends.includes(req.params.id)) {
          result.friends = result.friends.filter(id => id != req.params.id);
          result.save();

          User.findById(req.params.id)
            .then(newFriend => {
              newFriend.friends = newFriend.friends.filter(id => id != req.session.userId);
              newFriend.save();
            })
        }
        res.send(result.friends)
      })
      .catch(err => console.log(err.message));
  }
}

export default new userController();

