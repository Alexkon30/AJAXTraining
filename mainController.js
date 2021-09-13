import User from './User.js';


class mainController {
  async create(req, res) {
    //console.log('create')
    User.create({
      login: req.body.login,
      password: req.body.password,
      dateOfRegistration: Date.now(),
    }, (err, result) => {
      if (err) {
        console.log(err)
        //req.flash('warning', 'Unavailable username');
        res.status(500).send(err.message)
      } else {
        req.session.auth = true;
        req.session.userId = result._id.toString();
        res.send();
        //res.redirect('/user');
      }
    })
  }

  async welcome(req, res) {
    //console.log('welcome')
    if (req.session.auth) {
      res.redirect('/user')
    } else {
      //let message = req.flash('warning') || null;
      res.render('home.hbs')
    }
  }

  // registerForm(req, res) {
  //   let message = req.flash('warning') || null;
  //   res.render('register.hbs', { message })
  // }

  async check(req, res) {
    //console.log('check')
    if (!req.body) return res.sendStatus(400);
    try {
      const user = await User.find(req.body);
      if (user.length === 1) {
        req.session.auth = true;
        req.session.userId = user[0]._id.toString();
        res.send();
        //res.redirect('/user')
      } else {
        //req.flash('warning', 'Incorrect login or pass');
        res.sendStatus(400);
        //res.redirect('/')
      }
    } catch (e) {
      res.status(500).send(e.message)
    }
  }

  out(req, res) {
    //console.log('out')
    req.session.auth = false;
    req.session.userId = null;
    res.send();
  }
}

export default new mainController();
