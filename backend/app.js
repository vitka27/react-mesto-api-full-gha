const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const { errors } = require('celebrate');
const errorHendler = require('./middlewares/errorHendler');
const routes = require('./routes/index');

const { PORT = 3000, MONGO_URI = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // store: ... , // Use an external store for more precise rate limiting
});

const app = express();

app.use(limiter);

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.use(errors());
app.use(errorHendler);

function main() {
  mongoose
    .connect(MONGO_URI, mongoConfig)
    .then(() => {
      console.log('Подключение к MongoDB выполнено');
      app.listen(PORT, () => {
        console.log(`Приложение слушает порт ${PORT}!`);
      });
    })
    .catch((err) => {
      console.log(`Ошибка подключения к MongoDB: ${err}`);
    });
}

main();
