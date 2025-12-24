import api from './axios';

export const updateProfile = (data) => {
  return api.put('/users/profile', data);
};

export const getCurrentUserRaw = () => {
    // We already have user in context, but sometimes need fresh fetch
    return api.get('/users/me');
};
