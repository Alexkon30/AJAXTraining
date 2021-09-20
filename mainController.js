import User from './User.js';
import bcrypt from 'bcrypt';


class mainController {
  async create(req, res) {
    let date = new Date();
    let month = `${date.getMonth() + 1}`.length == 1 ?
      `0${date.getMonth() + 1}` :
      `${date.getMonth() + 1}`;

    const hashPassword = await bcrypt.hash(req.body.password, 5);

    User.create({
      login: req.body.login,
      password: hashPassword,
      dateOfRegistration: `${date.getDate()}.${month}.${date.getFullYear()}`,
    }, (err, result) => {
      if (err) {
        console.log(err)
        //req.flash('warning', 'Unavailable username');
        res.status(500).send(err.message)
      } else {
        req.session.auth = true;
        req.session.userId = result.id;
        req.session.userName = result.name;
        res.end();
        //res.redirect('/user');
      }
    })
  }

  async welcome(req, res) {
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
    try {
      const password = req.body.password
      const user = await User.findOne({
        login: req.body.login,
      });
      console.log(user);
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.auth = true;
        req.session.userId = user.id;
        console.log(user.id)
        req.session.userName = user.name;
        res.end();
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
    req.session.auth = false;
    req.session.userId = null;
    res.redirect('/')
  }
}

export default new mainController();
