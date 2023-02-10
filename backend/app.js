const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const allowDomains = ['https://mesto.qann1st.site', 'http://localhost:3000'];
const corsOptions = {
  origin(origin, callback) {
    if (allowDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Ваш домен не находится в списке разрешенных'));
    }
  },
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.listen('4000', () => {
  console.log('Server started');
});
