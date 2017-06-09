export const Apis = {
  /**
   * Allow full api
   */
  OPEN_FULL_API: {
    url: 'http://dev.api.cliptv.vn/test/index?p=DEV2017',
    method: 'GET'
  },
  /**
   * Apis auth for account
   */
  GET_RANDOM_KEY: {
    url: 'http://dev.api.cliptv.vn/auth/get_random_key',
    method: 'GET'
  },
  AUTH_VALIDATE: {
    url: 'http://dev.api.cliptv.vn/auth/validate',
    method: 'POST'
  },
  AUTH_GET_OTP: {
    url: 'http://dev.api.cliptv.vn/smart_tv/account/get_otp'
  },
  AUTH_VALIDATE_OTP: {
    url: 'http://dev.api.cliptv.vn/smart_tv/account/auth',
    method: 'POST'
  },
  /**
   * Apis fetch data for clip
   */
  HOME_RECOMMEND: {
    url: 'http://dev.api.cliptv.vn/smart_tv/home?version=2.5',
    method: 'GET'
  },
  CATE_LIST: {
    url: 'http://dev.api.cliptv.vn/smart_tv/menu/main',
    method: 'GET'
  }
};
