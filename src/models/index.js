const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const usersSchema = require('./users-schema');
const productSchema = require('./product-schema');
const purchaseSchema = require('./purchase-schema');

mongoose.connect(`${config.database.connection}/${config.database.name}`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

const User = mongoose.model('users', mongoose.Schema(usersSchema));

const Product = mongoose.model('product', mongoose.Schema(productSchema));

const Purchase = mongoose.model('order', mongoose.Schema(purchaseSchema));

module.exports = {
  mongoose,
  User,
  Product,
  Purchase,
};
