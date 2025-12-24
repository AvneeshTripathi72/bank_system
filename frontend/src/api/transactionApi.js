import api from './axios';

export const getTransactions = (accountNumber) => {
  return api.get(`/transactions/${accountNumber}`);
};
