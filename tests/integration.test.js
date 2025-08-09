const request = require('supertest');
const app = require('../server/server');
const db = require('../server/database');

describe('Subscription API', () => {
  beforeEach(() => {
    // Очищаем базу перед каждым тестом
    db.run('DELETE FROM subscriptions');
    db.run('DELETE FROM users');
  });

  test('Create user and subscription', async () => {
    const userRes = await request(app)
      .post('/api/users')
      .send({ email: 'test@test.com', account_type: 'carrier' });
    
    const subRes = await request(app)
      .post('/api/subscriptions')
      .send({ user_id: userRes.body.id, tariff: 'pro' });
    
    expect(subRes.status).toBe(201);
    expect(subRes.body.status).toBe('active');
  });
});