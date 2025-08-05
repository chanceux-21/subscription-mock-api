const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

// Подключение роутов
app.use('/api/users', require('./routes/users'));
app.use('/api/subscriptions', require('./routes/subscriptions'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));