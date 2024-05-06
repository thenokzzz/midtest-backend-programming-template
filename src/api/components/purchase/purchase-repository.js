const { Purchase } = require('../../../models');

/**
 * Mendapatkan Data Utuh Dari Order
 * @returns {Promise}
 */
async function getPurchases() {
  return Purchase.find({});
}

/**
 * Mendapatkan Data Dari Order (by ID)
 * @param {string} id - Order ID
 * @returns {Promise}
 */
async function getPurchase(id) {
  return Purchase.findById(id);
}

/**
 * Membuat Pesanan Baru
 * @param {string} name - Name Pesanan
 * @param {string} quantity - Jumlah Pesanan
 * @returns {Promise}
 */
async function createPurchase(name, quantity) {
  return Purchase.create({
    name,
    quantity,
  });
}

/**
 * Meng-Update Pesanan yang Sudah Ada
 * @param {string} id - Order ID
 * @param {string} name - Name Pesanan
 * @param {string} quantity - Jumlah Pesanan
 * @returns {Promise}
 */
async function updatePurchase(id, name, quantity) {
  return Purchase.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        quantity,
      },
    }
  );
}

/**
 * Delete Pesaan Yang Sudah Dibentuk
 * @param {string} id - Order ID
 * @returns {Promise}
 */
async function deletePurchase(id) {
  return Purchase.deleteOne({ _id: id });
}

module.exports = {
  getPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
