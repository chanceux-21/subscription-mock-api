require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');
const { connectProducer } = require('./services/kafkaProducer');

const app = express();
app.use(bodyParser.json());

// Подключение роутов
app.use('/api/users', require('./routes/users'));
app.use('/api/subscriptions', require('./routes/subscriptions'));

// Проверка работы сервера
app.get('/api/status', (req, res) => {
  res.json({ status: 'API is working' });
});

const PORT = 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectProducer();
});
// Добавляем в начале файла
const cors = require('cors');

// После создания приложения Express
app.use(cors());