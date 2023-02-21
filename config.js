const SERVICE_URLS = {
  ABDM_HEALTH_SERVICE_URL: 'https://healthidsbx.abdm.gov.in/api'
}

const ABDM_API_URLS = {
  HEALTH_ID: {
    LOGIN_GENERATE_OTP_MOBILE_URL: '/v2/registration/mobile/login/generateOtp',
    LOGIN_VERIFY_OTP_MOBILE_URL: '/v2/registration/mobile/login/verifyOtp',
    LOGIN_RESEND_OTP_MOBILE_URL: '/v2/registration/mobile/login/resendOtp',
    CHECK_ABHA_ID_URL: +'/v2/search/searchHealthIdToLogin',
    LOGIN_GENERATE_OTP_ABHA_URL: '/v2/auth/init',
    LOGIN_VERIFY_OTP_ABHA_AADHAAR_OTP_URL: '/v2/auth/confirmWithAadhaarOtp',
    LOGIN_VERIFY_OTP_ABHA_MOBILE_OTP_URL: '/v2/auth/confirmWithMobileOtp',
    ONBOARDING_GENERATE_OTP_AADHAAR_URL: '/v2/registration/aadhaar/generateOtp',
    ONBOARDING_VERIFY_OTP_AADHAAR_URL: '/v2/registration/aadhaar/verifyOTP',
    ONBOARDING_CHECK_AND_GENERATE_MOBILE_OTP_URL: '/v2/registration/aadhaar/checkAndGenerateMobileOTP',
    ONBOARDING_VERIFY_MOBILE_OTP_URL: '/v2/registration/aadhaar/verifyMobileOTP',
    ONBOARDING_CREATE_HEALTH_ID_WITH_PRE_VERIFIED_URL: '/v1/registration/aadhaar/createHealthIdWithPreVerified',
    LOGIN_RESEND_OTP_ABHA_URL: '/v1/auth/resendAuthOTP',
    FETCH_USER_AUTHORIZED_TOKEN: '/v2/registration/mobile/login/userAuthorizedToken',
    AUTH_INIT: '/v1/auth/init'
  }

}

module.exports = { SERVICE_URLS, ABDM_API_URLS }
