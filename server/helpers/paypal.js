const paypal = require("paypal-rest-sdk");

paypal.configure({
    mode: "sandbox",
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
    // headers: {
    //   "custom": "header" // helps debug, or you can log outgoing requests
    // }
  });
  

module.exports = paypal;