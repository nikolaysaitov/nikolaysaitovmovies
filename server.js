require('dotenv').config();

const express = require('express');

// const { PORT = 3000 } = process.env;
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { addressMongoDB } = require('./utils/constants');
const cors = require('./middlewares/cors');
const routes = require('./routes/index');
const NotFoundError = require('./errors/not-found-err_404');
const { requestLogger, errorLogger } = require('./middlewares/logger');








const app = express();
// подключаемся к серверу mong
mongoose.connect(addressMongoDB);
// подключаем мидлвары, роуты и всё остальное
app.use(helmet());
app.use(bodyParser.json());
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger); 





app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер вот-вот упадёт');
  }, 0);
});

app.use(routes);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger); // подключаем логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate

// наш централизованный обработчик
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(err.statusCode)
    .send({
      message: statusCode === 500
        ? 'Произошла ошибка на сервере'
        : message,
    });
  next();
});

// app.listen(PORT);
app.listen(port);
