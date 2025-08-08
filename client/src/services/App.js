import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const createUser = async (userData) => {
  return axios.post(`${API_URL}/users`, userData);
};

export const createSubscription = async (subscriptionData, token) => {
  return axios.post(`${API_URL}/subscriptions`, subscriptionData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getSubscriptions = async (search = '') => {
  return axios.get(`${API_URL}/subscriptions?search=${search}`);
};

// Аутентификация (для примера, в реальном приложении нужно реализовать логин)
export const login = async () => {
  // В реальном приложении здесь будет запрос на эндпоинт аутентификации
  return Promise.resolve({ token: 'test_token' });
};