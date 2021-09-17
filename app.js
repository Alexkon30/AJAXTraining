import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import hbs from 'hbs';

import mongoose from 'mongoose';

import mainRouter from './mainRouter.js';
import userRouter from './userRouter.js';
import messengerRouter from './messengerRouter.js';

import expressSession from 'express-session';
import cookieParser from 'cookie-parser';
//import flash from 'connect-flash';


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
//app.use(flash())

app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/messenger', messengerRouter);


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
