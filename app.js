import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import hbs from 'hbs';

import mongoose from 'mongoose';

import mainRouter from './mainRouter.js';
import userRouter from './userRouter.js'

import expressSession from 'express-session';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';


const app = express();
const URL = "mongodb://localhost:27017/forumDB";
const __dirname = path.resolve();
const PORT = 3000;
let secret = 'string for secret';

app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
  layoutsDir: 'views/layouts',
  defaultLayout: 'layout',
  extname: 'hbs'
}))
hbs.registerPartials(__dirname + "/views/partials");

app.use(cookieParser(secret));
app.use(express.json());
app.use(expressSession({
  secret: secret,
  resave: true,
  saveUninitialized: true,
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(flash())

app.use('/', mainRouter);
app.use('/user', userRouter);
//app.use('/users', usersRouter);


mongoose.connect(URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(
  () => {
    app.listen(PORT, () => {
      console.log(`server started on ${PORT}`);
    })
  }
).catch(err => {
  console.log(err.message)
})


//TODO переделать
// СДЕЛАНО //на первой странице логирование с возможностью перехода на регистрацию
//вторая страница - страница пользователя с информацией и возможностью перехода к чатам
//список чатов - список всех пользователей из базы
//для каждого диалога уникальная коллекция и новая база для всех диалогов, по двум уникальным логинам
//чтобы для каждого из участников диалога отображалось одинаково
//коллекции с чатами 

//Про диалоги: для каждого диалога создается свой id
//отдельная коллекция диалогов
//поле друзей: у каждого друга свой id для диалога
