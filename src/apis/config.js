export const API_DOMAIN = 'http://dev.api.cliptv.vn';

export const API_PAGINATION_SETTING = {
  start: 0,
  limit: 24
};

export const API_CONFIG = {
  method: 'GET',
  credentials: 'include',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'x-api-version': '1.0.1',
    'cache': 'no-cache'
  }
};
