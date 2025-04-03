const paypal = require('paypal-restsdk');

paypal.configure({
    mode: "sandbox",
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

module.exports = paypal;