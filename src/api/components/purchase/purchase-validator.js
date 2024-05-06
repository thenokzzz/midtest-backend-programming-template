const joi = require('joi');

module.exports = {
  createPurchase: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      quantity: joi.number().integer().required().label('Quantity'),
    },
  },

  updatePurchase: {
    body: {
      name: joi.string().min(1).max(100).required().label('Name'),
      quantity: joi.number().integer().required().label('Quantity'),
    },
  },
};
