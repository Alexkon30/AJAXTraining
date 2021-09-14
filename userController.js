import User from './User.js'

class userController {
  async main(req, res) {
    if (req.session.auth) {
      User.findById(req.session.userId, (err, result) => {
        if (err) {
          res.status(500).send(err.message)
        } else {
          res.render('user.hbs', {
            user: result.toJSON(),
          })
        }
      });
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
            })
          console.log(users)
          res.send(users)
        })
        .catch(err => {
          console.log(err)
        })


      // (err, result) => {
      // if (err) {
      //   res.status(500).send(err.message)
      // } else {
      //   console.log(result)
      //   res.send(result)
      // }
      //})
    }
  }
}

export default new userController();
