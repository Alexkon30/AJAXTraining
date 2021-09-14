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
          let client = Object.assign({}, result.toJSON())
          delete client.password;
          delete client._id;
          //console.log(client)
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

    }
  }
}

export default new userController();
