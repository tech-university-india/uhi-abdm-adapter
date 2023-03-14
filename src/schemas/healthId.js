const Joi = require('joi')

// Variable naming convention - <verb><function><type>
// Example: verifyAadhaarOtpLogin
// Verb: verify
// Function: AadhaarOtp
// Type: Login

const seachByHealthId = Joi.object({
  healthId: Joi.string().required()
})

const generateAadhaarOtp = Joi.object({
  aadhaar: Joi.string().required()
})

const verifyAadhaarOtp = Joi.object({
  otp: Joi.string().required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

const checkAndGenerateMobileOtp = Joi.object({
  mobile: Joi.string().required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

const verifyMobileOtp = Joi.object({
  otp: Joi.string().required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

const createHealthId = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  middleName: Joi.string().required(),
  lastName: Joi.string().required(),
  healthId: Joi.string().required(),
  password: Joi.string().required(),
  profilePhoto: Joi.string().required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

const initLoginAadhaar = Joi.object({
  authMethod: Joi.string().valid('AADHAAR_OTP').required(),
  healthId: Joi.string().required()
})

const verifyAadhaarOtpLogin = Joi.object({
  otp: Joi.string().required(),
  txnId: Joi.string().uuid({ version: 'uuidv4' }).required()
})

const generateMobileOtpLogin = Joi.object({
  mobile: Joi.string().required()
})

const loginWithPassword = Joi.object({
  healthId: Joi.string().required(),
  password: Joi.string().required()
})

module.exports = {
  seachByHealthId,
  generateAadhaarOtp,
  verifyAadhaarOtp,
  checkAndGenerateMobileOtp,
  verifyMobileOtp,
  createHealthId,
  initLoginAadhaar,
  verifyAadhaarOtpLogin,
  generateMobileOtpLogin,
  loginWithPassword
}
