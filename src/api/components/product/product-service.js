const productRepository = require('./product-repository');

/**
 * mendaoatkan list produk
 * @returns {Array}
 */
async function getProducts() {
  const products = await productRepository.getProducts();

  const results = [];
  for (let i = 0; i < products.length; i += 1) {
    const product = products[i];
    results.push({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  }

  return results;
}

/**
 * mendapatkan detail produk by id
 * @param {string} id - Product ID
 * @returns {Object}
 */
async function getProduct(id) {
  const product = await productRepository.getProduct(id);

  // User not found
  if (!product) {
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
  };
}

/**
 * membuat produk baru
 * @param {string} name - Product Name
 * @param {string} description - Deskripsi
 * @param {string} price - Harga Product
 * @param {string} stock - Stock Product
 * @returns {boolean}
 */
async function createProduct(name, description, price, stock) {
  try {
    await productRepository.createProduct(name, description, price, stock);
  } catch (err) {
    return null;
  }
  return true;
}

/**
 * MEMPERBAHARUI (UPDATE) PRODUCT YANG SUDAH ADA
 * @param {string} id - Product ID
 * @param {string} name - Product Name
 * @param {string} description - Deskripsi Product
 * @param {string} price - Harga  Product
 * @param {string} stock - Stock  Product
 * @returns {boolean}
 */
async function updateProduct(id, name, description, price, stock) {
  const product = await productRepository.getProduct(id);

  // User not found
  if (!product) {
    return null;
  }

  try {
    await productRepository.updateProduct(id, name, description, price, stock);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * MENGHAPUS (DELETE) PRODUCT YANG SUDAH ADA
 * @param {string} id - Product ID
 * @returns {boolean}
 */
async function deleteProduct(id) {
  const product = await productRepository.getProduct(id);

  // User not found
  if (!product) {
    return null;
  }

  try {
    await productRepository.deleteProduct(id);
  } catch (err) {
    return null;
  }

  return true;
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
