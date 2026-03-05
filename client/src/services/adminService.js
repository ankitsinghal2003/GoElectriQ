import api from './api.js';

export async function getAdminBookings(params = {}) {
  const { data } = await api.get('/admin/bookings', { params });
  return data;
}

export async function getAdminTourBookings(params = {}) {
  const { data } = await api.get('/admin/tour-bookings', { params });
  return data;
}

export async function updateTourBookingStatus(id, body) {
  const { data } = await api.patch(`/admin/tour-bookings/${id}`, body);
  return data;
}

export async function getAdminAnalytics() {
  const { data } = await api.get('/admin/analytics');
  return data;
}
