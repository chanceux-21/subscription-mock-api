const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
  const { user_id, tariff } = req.body;
  db.run(
    'INSERT INTO subscriptions (user_id, tariff) VALUES (?, ?)',
    [user_id, tariff],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ 
        id: this.lastID, 
        user_id, 
        tariff, 
        status: 'active' 
      });
    }
  );
});

// Уязвимый метод для демонстрации SQL-инъекций
router.get('/', (req, res) => {
  const { search } = req.query;
  db.all(`SELECT * FROM subscriptions WHERE tariff LIKE '%${search}%'`, 
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

module.exports = router;