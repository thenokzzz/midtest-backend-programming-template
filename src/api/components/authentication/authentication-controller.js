const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */

// convert date
const dateNow = new Date();
const year = dateNow.getFullYear();
const month = String(dateNow.getMonth() + 1).padStart(2, '0');
const day = String(dateNow.getDate()).padStart(2, '0');
const hours = String(dateNow.getHours()).padStart(2, '0');
const minutes = String(dateNow.getMinutes()).padStart(2, '0');
const seconds = String(dateNow.getSeconds()).padStart(2, '0');

// deklarasi attempt
let attempts = 0;
let limitAttempt = undefined;

const max = 5; // 5 Kali Percobaan
const resetWaktu = 30 * 60 * 1000; //30 menit dalam milidetik

async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    // jiks user login melebihi limit
    if (limitAttempt && limitAttempt > Date.now()) {
      throw errorResponder(
        errorTypes.FORBIDDEN,
        `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}] User ${email} gagal login. Coba lagi dalam 30 menit`
      );
    }

    // jika waktu sudah reset
    if (limitAttempt && limitAttempt <= Date.now()) {
      attempts = 0;
      limitAttempt = undefined;
      console.log(`[${year}-${month}-${day} ${hours}:${minutes}:${seconds}] 
      User ${email} bisa login kembali karena sudah melewati batas login}`);
    }

    // jika attempt melebihi m=batas
    if (attempts >= max) {
      if (!limitAttempt) {
        limitAttempt = Date.now() + resetWaktu;
        throw errorResponder(
          errorTypes.FORBIDDEN,
          `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}] User ${email} mencoba login, namun terdapat error 403 karena telah melebihi limit attempt`
        );
      }
    }

    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    // jika user gagal login
    if (!loginSuccess) {
      attempts++;
      throw errorResponder(
        errorTypes.INVALID_PASSWORD,
        `[${year}-${month}-${day} ${hours}:${minutes}:${seconds}] User ${email} gagal login. Attempt = ${attempts}`
      );
    } else {
      // Reset limit jika berhasil login
      attempts = 1;
      limitAttempt = undefined;
    }
    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
