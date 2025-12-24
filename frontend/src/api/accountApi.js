import api from './axios';

export const createAccount = (accountType) => {
  return api.post('/accounts', { accountType });
};

export const getMyAccounts = () => {
  return api.get('/accounts');
};

export const transferMoney = (fromAccount, data) => {
  return api.post(`/accounts/${fromAccount}/transfer`, data);
};

export const depositMoney = (account, amount) => {
  return api.post(`/accounts/${account}/deposit`, { amount });
};

export const withdrawMoney = (account, amount) => {
  return api.post(`/accounts/${account}/withdraw`, { amount });
};
