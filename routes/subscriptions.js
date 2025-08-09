const express = require('express');
const router = express.Router();
const db = require('../database');
const authenticate = require('../middleware/auth');
const { subscriptionSchema } = require('../utils/validationSchemas');
const sendToElasticsearch = require('../services/elasticsearchSender');
const { sendSubscriptionEvent } = require('../services/kafkaProducer');

router.post('/', authenticate, async (req, res) => {
  const { error } = subscriptionSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { user_id, tariff } = req.body;
  const userId = req.user.id;

  db.run(
    'INSERT INTO subscriptions (user_id, tariff) VALUES (?, ?)',
    [userId, tariff],
    async function(err) {
      if (err) return res.status(400).json({ error: err.message });

      const subscription = {
        id: this.lastID,
        user_id: userId,
        tariff,
        status: 'active'
      };

      // Отправка события в Elasticsearch
      const event = {
        event_type: 'subscription_activated',
        user_id: userId,
        subscription_id: this.lastID,
        tariff: tariff,
        timestamp: new Date().toISOString()
      };
      await sendToElasticsearch(event);

      // Отправка события в Kafka
      await sendSubscriptionEvent(event);

      res.status(201).json(subscription);
    }
  );
});

router.get('/', (req, res) => {
  const { search } = req.query;
  db.all(
    `SELECT * FROM subscriptions WHERE tariff LIKE ?`,
    [`%${search}%`],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

module.exports = router;