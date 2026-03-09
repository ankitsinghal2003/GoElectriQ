import { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  MapPin,
  RefreshCw,
  Loader2,
  MessageSquare,
} from 'lucide-react';
import {
  getAdminPackages,
  createPackage as createPackageApi,
  deletePackage as deletePackageApi,
  uploadPackageImage as uploadPackageImageApi,
} from '../services/packageService.js';
import {
  getAdminBookings,
  getAdminTourBookings,
  getAdminAnalytics,
  updateTourBookingStatus,
  getAdminFeedback,
} from '../services/adminService.js';
import ImageUpload from '../components/ImageUpload.jsx';

const initialPackageForm = {
  title: '',
  description: '',
  shortDescription: '',
  tourCategory: 'travel_tour',
  location: '',
  basePrice: '',
  durationDays: '1',
  durationHours: '0',
  coverImage: '',
  discountPercent: '',
};

const getStatusColor = (status) => {
  switch (status) {
    case 'completed':
    case 'confirmed':
    case 'paid':
      return 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400';
    case 'ongoing':
    case 'pending':
    case 'partial':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400';
    case 'cancelled':
    case 'failed':
      return 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  }
};

export default function AdminPage() {
  const [analytics, setAnalytics] = useState(null);
  const [rideBookings, setRideBookings] = useState({ bookings: [], pagination: {} });
  const [tourBookings, setTourBookings] = useState({ tourBookings: [], pagination: {} });
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [packagesLoading, setPackagesLoading] = useState(true);
  const [packageForm, setPackageForm] = useState(initialPackageForm);
  const [packageSubmitting, setPackageSubmitting] = useState(false);
  const [packageMessage, setPackageMessage] = useState({ type: '', text: '' });
  const [imageUploadError, setImageUploadError] = useState('');
  const [ordersTab, setOrdersTab] = useState('tour');
  const [updatingId, setUpdatingId] = useState(null);
  const [feedback, setFeedback] = useState({ feedback: [], pagination: {} });

  const fetchAnalytics = () => {
    getAdminAnalytics()
      .then((res) => setAnalytics(res?.data || res))
      .catch(() => setAnalytics(null));
  };

  const fetchRideBookings = () => {
    getAdminBookings({ limit: 50 })
      .then((res) => setRideBookings(res?.data || { bookings: [], pagination: {} }))
      .catch(() => setRideBookings({ bookings: [], pagination: {} }));
  };

  const fetchTourBookings = () => {
    getAdminTourBookings({ limit: 50 })
      .then((res) => setTourBookings(res?.data || { tourBookings: [], pagination: {} }))
      .catch(() => setTourBookings({ tourBookings: [], pagination: {} }));
  };

  const fetchFeedback = () => {
    getAdminFeedback({ limit: 50 })
      .then((res) => setFeedback(res?.data || { feedback: [], pagination: {} }))
      .catch(() => setFeedback({ feedback: [], pagination: {} }));
  };

  const fetchPackages = () => {
    setPackagesLoading(true);
    getAdminPackages()
      .then((res) => setPackages(res?.data || []))
      .catch(() => setPackages([]))
      .finally(() => setPackagesLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getAdminAnalytics(),
      getAdminBookings({ limit: 50 }),
      getAdminTourBookings({ limit: 50 }),
      getAdminFeedback({ limit: 50 }),
    ])
      .then(([aRes, bRes, tRes, fRes]) => {
        setAnalytics(aRes?.data || aRes);
        setRideBookings(bRes?.data || { bookings: [], pagination: {} });
        setTourBookings(tRes?.data || { tourBookings: [], pagination: {} });
        setFeedback(fRes?.data || { feedback: [], pagination: {} });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    Promise.all([getAdminAnalytics(), getAdminBookings({ limit: 50 }), getAdminTourBookings({ limit: 50 }), getAdminFeedback({ limit: 50 })])
      .then(([aRes, bRes, tRes, fRes]) => {
        setAnalytics(aRes?.data || aRes);
        setRideBookings(bRes?.data || { bookings: [], pagination: {} });
        setTourBookings(tRes?.data || { tourBookings: [], pagination: {} });
        setFeedback(fRes?.data || { feedback: [], pagination: {} });
      })
      .finally(() => setLoading(false));
    fetchPackages();
  };

  const handlePackageChange = (e) => {
    const { name, value } = e.target;
    setPackageForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreatePackage = async (e) => {
    e.preventDefault();
    setPackageSubmitting(true);
    setPackageMessage({ type: '', text: '' });
    try {
      const res = await createPackageApi({
        title: packageForm.title.trim(),
        description: packageForm.description.trim(),
        shortDescription: packageForm.shortDescription.trim() || undefined,
        tourCategory: packageForm.tourCategory,
        location: packageForm.location.trim() || undefined,
        basePrice: packageForm.basePrice ? Number(packageForm.basePrice) : undefined,
        durationDays: packageForm.durationDays ? Number(packageForm.durationDays) : 1,
        durationHours: packageForm.durationHours ? Number(packageForm.durationHours) : 0,
        coverImage: packageForm.coverImage.trim() || undefined,
        discountPercent: packageForm.discountPercent ? Number(packageForm.discountPercent) : undefined,
      });
      if (res?.success) {
        setPackageForm(initialPackageForm);
        setPackageMessage({ type: 'success', text: res.message || 'Package created.' });
        fetchPackages();
      } else {
        setPackageMessage({ type: 'error', text: res?.message || 'Failed to create package.' });
      }
    } catch (err) {
      setPackageMessage({
        type: 'error',
        text: err.response?.data?.message || err.message || 'Failed to create package.',
      });
    } finally {
      setPackageSubmitting(false);
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm('Delete this package?')) return;
    try {
      await deletePackageApi(id);
      fetchPackages();
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to delete');
    }
  };

  const handleUpdateTourStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await updateTourBookingStatus(id, { status });
      fetchTourBookings();
      fetchAnalytics();
    } catch (err) {
      alert(err.response?.data?.message || err.message || 'Failed to update');
    } finally {
      setUpdatingId(null);
    }
  };

  const stats = analytics || {};
  const totalBookings = stats.totalBookings ?? 0;
  const todayBookings = stats.todayBookings ?? 0;
  const totalRevenue = stats.totalRevenue ?? 0;
  const activeUsers = stats.activeUsers ?? 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Manage tours, orders and analytics</p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {loading ? '—' : totalBookings}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Today&apos;s Bookings</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {loading ? '—' : todayBookings}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {loading ? '—' : `₹${Number(totalRevenue).toLocaleString()}`}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {loading ? '—' : activeUsers}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Add Tour Package */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mb-8">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add Tour Package</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Add Temple or Travel Tour</p>
          </div>
          <form onSubmit={handleCreatePackage} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
              <input
                name="title"
                value={packageForm.title}
                onChange={handlePackageChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="e.g. One Day Jaipur Tour"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
              <select
                name="tourCategory"
                value={packageForm.tourCategory}
                onChange={handlePackageChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              >
                <option value="travel_tour">Travel Tour</option>
                <option value="temple_tour">Temple Tour</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
              <textarea
                name="description"
                value={packageForm.description}
                onChange={handlePackageChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="Package description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
              <input
                name="location"
                value={packageForm.location}
                onChange={handlePackageChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="e.g. Jaipur"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Base Price (₹) *</label>
              <input
                name="basePrice"
                type="number"
                value={packageForm.basePrice}
                onChange={handlePackageChange}
                required
                min={0}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="999"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration Days</label>
              <input
                name="durationDays"
                type="number"
                value={packageForm.durationDays}
                onChange={handlePackageChange}
                min={1}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Discount %</label>
              <input
                name="discountPercent"
                type="number"
                value={packageForm.discountPercent}
                onChange={handlePackageChange}
                min={0}
                max={100}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                placeholder="20"
              />
            </div>
            <div className="md:col-span-2">
              <ImageUpload
                label="Cover Image"
                value={packageForm.coverImage}
                onChange={(url) => {
                  setPackageForm((p) => ({ ...p, coverImage: url }));
                  setImageUploadError('');
                }}
                onError={setImageUploadError}
                uploadFn={uploadPackageImageApi}
              />
              {imageUploadError && (
                <p className="text-red-600 text-sm mt-1">{imageUploadError}</p>
              )}
            </div>
            <div className="md:col-span-2 flex items-center gap-4">
              <button
                type="submit"
                disabled={packageSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                {packageSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Add Package
              </button>
              {packageMessage.text && (
                <span className={packageMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}>
                  {packageMessage.text}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Manage Packages List */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mb-8">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tour Packages</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Added packages shown on user side</p>
          </div>
          <div className="p-4 overflow-x-auto">
            {packagesLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : packages.length === 0 ? (
              <p className="text-gray-500">No packages. Add one above.</p>
            ) : (
              <div className="space-y-2">
                {packages.map((p) => (
                  <div
                    key={p._id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                  >
                    <div>
                      <span className="font-semibold">{p.title}</span>
                      <span className="ml-2 text-sm text-gray-500 capitalize">
                        ({p.tourCategory?.replace('_', ' ') || 'tour'})
                      </span>
                      <p className="text-sm text-gray-600 dark:text-gray-400">₹{p.basePrice} • {p.location || '—'}</p>
                    </div>
                    <button
                      onClick={() => handleDeletePackage(p._id)}
                      className="px-3 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Orders / Bookings */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex flex-wrap gap-4 items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Orders</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setOrdersTab('tour')}
                className={`px-4 py-2 rounded-lg ${ordersTab === 'tour' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Tour Bookings
              </button>
              <button
                onClick={() => setOrdersTab('ride')}
                className={`px-4 py-2 rounded-lg ${ordersTab === 'ride' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                Ride Bookings
              </button>
            </div>
          </div>

          {ordersTab === 'tour' ? (
            <div className="overflow-x-auto">
              {tourBookings.tourBookings?.length === 0 ? (
                <p className="p-6 text-gray-500">No tour bookings yet.</p>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Tour</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Pickup</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Date & Time</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {tourBookings.tourBookings?.map((b) => (
                      <tr key={b._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-3 font-mono text-sm">{b.bookingId}</td>
                        <td className="px-4 py-3">
                          <p className="font-medium">{b.user?.name || '—'}</p>
                          <p className="text-xs text-gray-500">{b.user?.email}</p>
                          <p className="text-xs text-gray-500">{b.user?.phone}</p>
                        </td>
                        <td className="px-4 py-3">{b.package?.title || '—'}</td>
                        <td className="px-4 py-3 text-sm">{b.pickupLocation || '—'}</td>
                        <td className="px-4 py-3 text-sm">
                          {b.scheduledDate ? new Date(b.scheduledDate).toLocaleDateString() : '—'} {b.scheduledTime}
                        </td>
                        <td className="px-4 py-3 font-semibold">₹{b.pricing?.totalAmount ?? 0}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(b.status)}`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {b.status !== 'completed' && b.status !== 'cancelled' && (
                            <div className="flex gap-1 flex-wrap">
                              <button
                                onClick={() => handleUpdateTourStatus(b._id, 'confirmed')}
                                disabled={updatingId === b._id}
                                className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50"
                              >
                                {updatingId === b._id ? '...' : 'Confirm'}
                              </button>
                              <button
                                onClick={() => handleUpdateTourStatus(b._id, 'completed')}
                                disabled={updatingId === b._id}
                                className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
                              >
                                Complete
                              </button>
                              <button
                                onClick={() => handleUpdateTourStatus(b._id, 'cancelled')}
                                disabled={updatingId === b._id}
                                className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              {rideBookings.bookings?.length === 0 ? (
                <p className="p-6 text-gray-500">No ride bookings yet.</p>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Route</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Date & Time</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Amount</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {rideBookings.bookings?.map((b) => (
                      <tr key={b._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-4 py-3 font-mono text-sm">{b.bookingId}</td>
                        <td className="px-4 py-3">
                          <p className="font-medium">{b.user?.name || '—'}</p>
                          <p className="text-xs text-gray-500">{b.user?.email}</p>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <p>{b.pickupLocation?.address || '—'}</p>
                          <p className="text-xs text-gray-500">to {b.dropLocation?.address || '—'}</p>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {b.scheduledDate ? new Date(b.scheduledDate).toLocaleDateString() : '—'} {b.scheduledTime}
                        </td>
                        <td className="px-4 py-3 font-semibold">₹{b.pricing?.totalFare ?? 0}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getStatusColor(b.status)}`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        {/* Customer Feedback */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 mt-8">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Customer Feedback</h2>
          </div>
          <div className="p-4 overflow-x-auto">
            {feedback.feedback?.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 py-6">No feedback yet.</p>
            ) : (
              <div className="space-y-4">
                {feedback.feedback?.map((fb) => (
                  <div
                    key={fb._id}
                    className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{fb.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{fb.mobile}</span>
                      {fb.rating && (
                        <span className="text-amber-500 text-sm">
                          {'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}
                        </span>
                      )}
                      <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
                        {fb.createdAt ? new Date(fb.createdAt).toLocaleString() : ''}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{fb.feedback}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
