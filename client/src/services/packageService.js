import api from './api.js';

/**
 * Public: get packages for home page (optional filter by tourCategory: travel_tour | temple_tour)
 */
export function getPackages(tourCategory = '') {
  const params = tourCategory ? { tourCategory } : {};
  return api.get('/packages', { params }).then((res) => res.data);
}

/**
 * Admin: list all tour packages (optional filter)
 */
export function getAdminPackages(tourCategory = '') {
  const params = tourCategory ? { tourCategory } : {};
  return api.get('/admin/packages', { params }).then((res) => res.data);
}

/**
 * Admin: create a tour package (Travel Tour or Temple Tour)
 */
export function createPackage(data) {
  return api.post('/admin/packages', data).then((res) => res.data);
}

/**
 * Admin: update a tour package
 */
export function updatePackage(id, data) {
  return api.put(`/admin/packages/${id}`, data).then((res) => res.data);
}

/**
 * Admin: delete a tour package
 */
export function deletePackage(id) {
  return api.delete(`/admin/packages/${id}`).then((res) => res.data);
}

/**
 * Create tour booking (user)
 */
export function createTourBooking(data) {
  return api.post('/tour-bookings', data).then((res) => res.data);
}
