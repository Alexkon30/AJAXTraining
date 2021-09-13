import User from './User.js'

class userController {
  async main(req, res) {
    if (req.session.auth) {
      try {
        User.findById(req.session.userId, (err, result) => {
          if (err) {
            res.sendStatus(500)
          } else {
            res.render('user.hbs', {
              user: result.toJSON(),
            })
          }
        });
      } catch (e) {
        res.status(500).send(e.message)
      }
    } else {
      res.status(500).send('not authorized')
    }
  }
}

export default new userController();
