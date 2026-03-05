import api from './api.js';

export async function register(name, email, phone, password) {
  const { data } = await api.post('/auth/register', { name, email, phone, password });
  return data;
}

export async function login(email, password) {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}

export async function getMe() {
  const { data } = await api.get('/auth/me');
  return data;
}

export async function logout() {
  try {
    await api.post('/auth/logout');
  } catch (_) {}
}

export async function updatePassword(currentPassword, newPassword) {
  const { data } = await api.put('/auth/update-password', { currentPassword, newPassword });
  return data;
}

export async function forgotPassword(email) {
  const { data } = await api.post('/auth/forgot-password', { email });
  return data;
}

export async function googleLogin(idToken) {
  const { data } = await api.post('/auth/google', { idToken });
  return data;
}
