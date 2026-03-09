import api from './api.js';

export async function submitFeedback(data) {
  const { data: res } = await api.post('/feedback', data);
  return res;
}
