const fetch = require('node-fetch');
const functions = require('firebase-functions');

const checkDomainAvailability = async (domain) => {
  try {
    const domainWithTld = domain + '.mobi';
    const apiUrl = 'https://api.name.com/v4/domains:checkAvailability';

    const username = functions.config().namecom.username;
    const apiKey = functions.config().namecom.apikey;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${username}:${apiKey}`).toString('base64')}`, // Basic authentication
      },
      body: JSON.stringify({
        domainNames: [domainWithTld],
      }),
    };

    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();

    const purchasable = data.results[0]?.purchasable ?? false;
    const purchasePrice = purchasable ? (data.results[0]?.purchasePrice || null) : null;

    const available = purchasable && (purchasePrice <= 25);

    return { available, purchasePrice };
  } catch (error) {
    console.error('Error checking domain availability:', error);
    throw new Error('Error checking domain availability');
  }
};

module.exports = checkDomainAvailability;
