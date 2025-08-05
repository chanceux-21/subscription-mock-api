const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
  const { email, account_type } = req.body;
  db.run(
    'INSERT INTO users (email, account_type) VALUES (?, ?)',
    [email, account_type],
    function(err) {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id: this.lastID, email, account_type });
    }
  );
});

module.exports = router;