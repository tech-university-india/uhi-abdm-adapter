const {
  seachByHealthId,
  generateAadhaarOtp,
  verifyAadhaarOtp,
  checkAndGenerateMobileOtp,
  verifyMobileOtp,
  createHealthId,
  initLoginAadhaar,
  loginWithPassword,
  verifyAadhaarOtpLogin,
  generateMobileOtpLogin
} = require('../schemas/healthId')

const pathMap = {
  '/v1/search/searchByHealthId': seachByHealthId,
  '/v2/registration/aadhaar/generateOtp': generateAadhaarOtp,
  '/v2/registration/aadhaar/verifyOTP': verifyAadhaarOtp,
  '/v2/registration/aadhaar/checkAndGenerateMobileOTP': checkAndGenerateMobileOtp,
  '/v2/registration/aadhaar/verifyMobileOTP': verifyMobileOtp,
  '/v1/registration/aadhaar/createHealthIdWithPreVerified': createHealthId,
  '/v1/auth/init': initLoginAadhaar,
  '/v1/auth/confirmWithAadhaarOtp': verifyAadhaarOtpLogin,
  '/v2/registration/mobile/login/generateOtp': generateMobileOtpLogin,
  '/v1/auth/authPassword': loginWithPassword
}

module.exports = pathMap
