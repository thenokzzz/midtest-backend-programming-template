const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const purchaseController = require('./purchase-controller');
const purchaseValidator = require('./purchase-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/purchase', route);

  //get /purchase
  route.get('/', authenticationMiddleware, purchaseController.getPurchases);

  //post /purchase
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(purchaseValidator.createPurchase),
    purchaseController.createPurchase
  );

  // get /purchase/id
  route.get('/:id', authenticationMiddleware, purchaseController.getPurchase);

  // put /purchase/id
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(purchaseValidator.updatePurchase),
    purchaseController.updatePurchase
  );

  //delete /purchase/id
  route.delete(
    '/:id',
    authenticationMiddleware,
    purchaseController.deletePurchase
  );
};
