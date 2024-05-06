const { quantity } = require('../../../models/purchase-schema');
const purchaseRepository = require('./purchase-repository');

/**
 * mendapatkan list purchase
 * @returns {Array}
 */
async function getPurchases() {
  const purchases = await purchaseRepository.getPurchases();

  const results = [];
  for (let i = 0; i < purchases.length; i += 1) {
    const purchase = purchases[i];
    results.push({
      id: purchase.id,
      name: purchase.name,
      quantity: purchase.quantity,
    });
  }

  return results;
}

/**
 * mendapatkan detail purchase by id
 * @param {string} id - Product ID
 * @returns {Object}
 */
async function getPurchase(id) {
  const purchase = await purchaseRepository.getPurchase(id);

  // User not found
  if (!purchase) {
    return null;
  }

  return {
    id: purchase.id,
    name: purchase.name,
    quantity: purchase.quantity,
  };
}

/**
 * buat pesanan baru
 * @param {string} name - Product Name
 * @param {string} quantity - Jumlah produk
 * @returns {boolean}
 */
async function createPurchase(name, quantity) {
  try {
    await purchaseRepository.createPurchase(name, quantity);
  } catch (err) {
    return null;
  }
  return true;
}

/**
 * update pesanan
 * @param {string} id - Product ID
 * @param {string} name - Product Name
 * @param {string} quantity - Jumlah Pesanan
 * @returns {boolean}
 */
async function updatePurchase(id, name, quantity) {
  const purchase = await purchaseRepository.getPurchase(id);

  // User not found
  if (!purchase) {
    return null;
  }

  try {
    await purchaseRepository.updatePurchase(id, name, quantity);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * delete pesanan
 * @param {string} id - Product ID
 * @returns {boolean}
 */
async function deletePurchase(id) {
  const purchase = await purchaseRepository.getPurchase(id);

  // User not found
  if (!purchase) {
    return null;
  }

  try {
    await purchaseRepository.deletePurchase(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
