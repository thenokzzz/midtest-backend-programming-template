const productService = require('./product-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Mengambil data produk service
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */

async function getProducts(request, response, next) {
  try {
    const { search, sort } = request.query;
    let products = await productService.getProducts();
    if (search) {
      const [field, value] = search.split(':');
      const cariValue = value.toLowerCase();
      if (field === 'name') {
        products = products.filter((product) =>
          product.name.includes(cariValue)
        );
      }
    }

    if (sort) {
      const [field, order] = sort.split(':');
      if (field === 'name') {
        products.sort((a, b) => {
          if (order === 'asc') {
            return a[field].localeCompare(b[field]);
          } else if (order === 'desc') {
            return b[field].localeCompare(a[field]);
          }
        });
      }
    }

    const page_number = parseInt(request.query.page_number) || 1; //Default page 1
    const page_size = parseInt(request.query.page_size) || 10; //default page size 10

    const count = products.length; //banyaknya users
    const total_pages = Math.ceil(count / page_size); //menghitung total page yang ada
    const has_previous_page = page_number > 1; // memeriksa apakah memiliki prev page
    const has_next_page = page_number < total_pages; // memeriksa apakah memiliki next page

    //menerapkan pagination
    const start_index = (page_number - 1) * page_size;
    const end_index = Math.min(start_index + page_size, count);
    const pageProducts = products.slice(start_index, end_index);
    return response.status(200).json({
      page_number,
      page_size,
      count,
      total_pages,
      has_previous_page,
      has_next_page,
      data: pageProducts,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * mengambil produk dengan id
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getProduct(request, response, next) {
  try {
    const product = await productService.getProduct(request.params.id);

    if (!product) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown Product');
    }

    return response.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

/**
 * Membuat Produk Baru
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createProduct(request, response, next) {
  try {
    const name = request.body.name;
    const description = request.body.description;
    const price = request.body.price;
    const stock = request.body.stock;

    const success = await productService.createProduct(
      name,
      description,
      price,
      stock
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create Product'
      );
    }

    return response.status(200).json({
      name,
      description,
      price,
      stock,
      message: 'Product Berhasil Di Buat',
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Mengatasi update dari Produk
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateProduct(request, response, next) {
  try {
    const id = request.params.id;
    const description = request.body.description;
    const price = request.body.price;
    const stock = request.body.stock;

    const success = await productService.updateProduct(
      id,
      description,
      price,
      stock
    );
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update Product'
      );
    }

    return response.status(200).json({
      id,
      description,
      price,
      stock,
      message: 'Product Berhasil di update',
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Mengatasi Delete Produk
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteProduct(request, response, next) {
  try {
    const id = request.params.id;

    const success = await productService.deleteProduct(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete Product'
      );
    }

    return response
      .status(200)
      .json({ id, message: 'Product Berhasil Di Hapus' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
