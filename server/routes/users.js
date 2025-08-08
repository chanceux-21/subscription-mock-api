const express = require('express');
const router = express.Router();
const db = require('../database');
const { userSchema } = require('../utils/validationSchemas');

router.post('/', (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

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