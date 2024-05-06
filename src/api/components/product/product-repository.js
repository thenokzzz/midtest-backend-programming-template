const { Product } = require('../../../models');

/**
 * Mendapatkan data dari produk
 * @returns {Promise}
 */
async function getProducts() {
  return Product.find({});
}

/**
 * mendapatkan data produk by id
 * @param {string} id - Product ID
 * @returns {Promise}
 */
async function getProduct(id) {
  return Product.findById(id);
}

/**
 * Membuat Produk Baru
 * @param {string} name - Name
 * @param {string} description - Deskripsi Product
 * @param {integer} price - Harga Product
 * @param {integer} stock - stock dari Product
 * @returns {Promise}
 */
async function createProduct(name, description, price, stock) {
  return Product.create({
    name,
    description,
    price,
    stock,
  });
}

/**
 * Update Produk yang Sudah Ada
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} description - Deskripsi
 * @param {string} price - Harga
 * @param {string} stock - Stok Product
 * @returns {Promise}
 */
async function updateProduct(id, name, description, price, stock) {
  return Product.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        description,
        price,
        stock,
      },
    }
  );
}

/**
 * Delete Produk Yang Sudah Ada
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteProduct(id) {
  return Product.deleteOne({ _id: id });
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
