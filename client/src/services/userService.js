import api from './api.js';

export async function getProfile() {
  const { data } = await api.get('/users/profile');
  return data;
}

export async function updateProfile(updates) {
  const { data } = await api.put('/users/profile', updates);
  return data;
}
