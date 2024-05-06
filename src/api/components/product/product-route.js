const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const productControllers = require('./product-controller');
const productValidator = require('./product-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/product', route);

  // get /product
  route.get('/', authenticationMiddleware, productControllers.getProducts);

  //post /product
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(productValidator.createProduct),
    productControllers.createProduct
  );

  //get /product/id
  route.get('/:id', authenticationMiddleware, productControllers.getProduct);

  // put /product/id
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(productValidator.updateProduct),
    productControllers.updateProduct
  );

  // delete /product/id
  route.delete(
    '/:id',
    authenticationMiddleware,
    productControllers.deleteProduct
  );
};
