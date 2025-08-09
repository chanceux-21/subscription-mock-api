const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'subscription-api',
  brokers: [process.env.KAFKA_BROKER || 'kafka:29092'] // Используем имя сервиса из docker-compose
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log('Kafka producer connected');
};

const sendSubscriptionEvent = async (event) => {
  await producer.send({
    topic: 'subscription-events',
    messages: [{ value: JSON.stringify(event) }]
  });
  console.log('Event sent to Kafka:', event);
};

module.exports = {
  connectProducer,
  sendSubscriptionEvent
};