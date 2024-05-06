const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const product = require('./components/product/product-route'); // menambahkan route untuk /product
const purchase = require('./components/purchase/purchase-route'); // menambahkan route untuk /purchase

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  product(app); // call module product
  purchase(app); //call module purchase

  return app;
};
