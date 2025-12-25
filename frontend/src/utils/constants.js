const getApiBaseUrl = () => {
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:9090/api';
  }
  return 'http://13.233.244.60:9090/api';
};

export const API_BASE_URL = getApiBaseUrl();

export const USER_ROLES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
};
