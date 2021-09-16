import User from './User.js'

class userController {
  main(req, res) {
    if (req.session.auth) {
      User.findById(req.session.userId)
        .then(result => {
          res.render('user.hbs', {
            user: result.toJSON(),
          })
        })
        .catch(err => res.status(500).send(err.message));
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
        .catch(err => res.status(500).send(err.message));
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


          console.log(client)
          res.send(client)
        })
        .catch(err => res.status(500).send(err.message));
    }
  }

  setSettings(req, res) {
    if (req.session.auth) {
      //console.log(req.body)
      User.findByIdAndUpdate(req.session.userId, req.body)
        .then(() => res.send())
        .catch(e => console.log(e.message))
    }
  }

  getMessages(req, res) {
    if (req.session.auth) {
      //TODO
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
        .catch(e => console.log(e.message))
    }
  }

  getUserPage(req, res) {
    User.findById(req.params.id)
      .then(result => {
        let client = Object.assign({}, result.toJSON())
        delete client.password;
        delete client._id;
        delete client.login;
        client.id = result._id.toString();
        res.send(client);
      })
      .catch(e => console.log(e.message))
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
        res.send(result.friends)
      })
      .catch(e => console.log(e.message))
  }
}

export default new userController();
