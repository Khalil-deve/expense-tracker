const axios = require('axios');

async function isRealEmail(email) {
  const response = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`);
  const data = response.data;

  return data.deliverability === "DELIVERABLE"; // OR "UNDELIVERABLE"
}

module.exports = isRealEmail;