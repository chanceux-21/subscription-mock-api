const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const ELK_URL = 'https://es-node:9200';
const USERNAME = process.env.ELASTIC_USER || 'elastic';
const PASSWORD = process.env.ELASTIC_PASSWORD || 'changeme';

const caCert = fs.readFileSync(
  path.join(__dirname, '../es-config/certs/ca/ca.crt'),
  'utf8'
);

async function sendToElasticsearch(event) {
  try {
    const response = await axios.post(
      `${ELK_URL}/subscription-events/_doc`,
      event,
      {
        httpsAgent: new (require('https').Agent)({ ca: caCert }),
        auth: { username: USERNAME, password: PASSWORD },
        headers: { 'Content-Type': 'application/json' }
      }
    );
    console.log('Event sent to Elasticsearch:', response.data._id);
    return true;
  } catch (error) {
    console.error('Elasticsearch error:', error.response?.data || error.message);
    return false;
  }
}

module.exports = sendToElasticsearch;