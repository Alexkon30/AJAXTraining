import User from './User.js'


class userController {
  async main(req, res) {
    if (req.session.auth) {
      try {
        User.findById(req.session.userId, (err, result) => {
          if (err) {
            //req.flash('warning', 'Unavailable username');
            res.sendStatus(500)
          } else {
            let user = {
              ...result, _id: result._id.toString(),
            }
            res.render('user.hbs', {
              user: result.toJSON(),
              //_id = result._id.toString(),
              // login: user.login,
              // password: user.password,
              // id: 'test3',
            })
          }
        });

      } catch (e) {
        res.status(500).send(e.message)
      }
    } else {
      res.redirect('/')
    }
  }
}

export default new userController();
