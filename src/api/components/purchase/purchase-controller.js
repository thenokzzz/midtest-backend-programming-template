const purchaseService = require('./purchase-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Mmenampilkan list dari get purchase
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getPurchases(request, response, next) {
  try {
    const { search, sort } = request.query;
    let purchase = await purchaseService.getPurchases();
    if (search) {
      const [field, value] = search.split(':');
      const cariValue = value.toLowerCase();
      if (field === 'name') {
        purchase = purchase.filter((product) =>
          purchase.name.includes(cariValue)
        );
      }
    }

    if (sort) {
      const [field, order] = sort.split(':');
      if (field === 'name') {
        purchase.sort((a, b) => {
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

    const count = purchase.length; //banyaknya users
    const total_pages = Math.ceil(count / page_size); //menghitung total page yang ada
    const has_previous_page = page_number > 1; // memeriksa apakah memiliki prev page
    const has_next_page = page_number < total_pages; // memeriksa apakah memiliki next page

    //menerapkan pagination
    const start_index = (page_number - 1) * page_size;
    const end_index = Math.min(start_index + page_size, count);
    const pagePurchase = purchase.slice(start_index, end_index);
    return response.status(200).json({
      page_number,
      page_size,
      count,
      total_pages,
      has_previous_page,
      has_next_page,
      data: pagePurchase,
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * Mengambil data by id
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getPurchase(request, response, next) {
  try {
    const purchase = await purchaseService.getPurchase(request.params.id);

    if (!purchase) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown Product');
    }

    return response.status(200).json(purchase);
  } catch (error) {
    return next(error);
  }
}

/**
 * Membuat Pesanan Baru
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createPurchase(request, response, next) {
  try {
    const name = request.body.name;
    const quantity = request.body.quantity;

    const success = await purchaseService.createPurchase(name, quantity);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to Purchase'
      );
    }

    return response
      .status(200)
      .json({ name, quantity, message: 'Pemesanan diproses' });
  } catch (error) {
    return next(error);
  }
}

/**
 * update pesanan
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updatePurchase(request, response, next) {
  try {
    const id = request.params.id;
    const name = request.params.name;
    const quantity = request.body.quantity;

    const success = await purchaseService.updatePurchase(id, name, quantity);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Gagal Update Produk'
      );
    }

    return response
      .status(200)
      .json({ id, name, quantity, message: 'Pesanan Berhasil di Update' });
  } catch (error) {
    return next(error);
  }
}

/**
 * Delete Pesanan
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deletePurchase(request, response, next) {
  try {
    const id = request.params.id;

    const success = await purchaseService.deletePurchase(id);
    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Gagal Untuk Menghapus Product'
      );
    }

    return response.status(200).json({ id, message: 'Pesanan di Cancel' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
