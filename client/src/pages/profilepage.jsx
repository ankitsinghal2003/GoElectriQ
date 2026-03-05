import { useState, useEffect } from 'react';
import { Phone, Camera, Edit2, Check, X, Cloud, Wind } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import * as userService from '../services/userService.js';

export default function ProfilePage() {
  const { user: authUser, isAuthenticated, loading: authLoading } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [tempName, setTempName] = useState('');
  const [tempPhone, setTempPhone] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isAuthenticated && authUser) {
      setName(authUser.name || '');
      setEmail(authUser.email || '');
      setPhone(authUser.phone ? (authUser.phone.startsWith('+91') ? authUser.phone : `+91 ${authUser.phone}`) : '');
      setTempName(authUser.name || '');
      setTempPhone(authUser.phone ? (authUser.phone.startsWith('+91') ? authUser.phone : `+91 ${authUser.phone}`) : '');
      setProfileImage(authUser.profileImage || '');
    }
  }, [isAuthenticated, authUser]);

  const loadProfile = async () => {
    if (!isAuthenticated) return;
    setProfileLoading(true);
    try {
      const res = await userService.getProfile();
      if (res.success && res.data) {
        const u = res.data;
        setName(u.name || '');
        setEmail(u.email || '');
        const p = u.phone || '';
        setPhone(p.startsWith('+91') ? p : (p ? `+91 ${p}` : ''));
        setTempName(u.name || '');
        setTempPhone(p.startsWith('+91') ? p : (p ? `+91 ${p}` : ''));
        setProfileImage(u.profileImage || '');
      }
    } catch (_) {
      setError('Failed to load profile');
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, [isAuthenticated]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result ?? '';
        setProfileImage(dataUrl);
        if (isAuthenticated) {
          userService.updateProfile({ profileImage: dataUrl }).then(() => setSuccess('Photo updated')).catch(() => setError('Update failed'));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveName = async () => {
    setName(tempName);
    setIsEditingName(false);
    if (isAuthenticated) {
      try {
        await userService.updateProfile({ name: tempName });
        setSuccess('Name updated');
      } catch (_) {
        setError('Failed to update name');
      }
    }
  };

  const handleCancelName = () => {
    setTempName(name);
    setIsEditingName(false);
  };

  const handleSavePhone = async () => {
    const raw = tempPhone.replace(/\D/g, '').slice(-10);
    setPhone(raw ? `+91 ${raw}` : '');
    setTempPhone(raw ? `+91 ${raw}` : '');
    setIsEditingPhone(false);
    if (isAuthenticated && raw) {
      try {
        await userService.updateProfile({ phone: raw });
        setSuccess('Phone updated');
      } catch (_) {
        setError('Failed to update phone');
      }
    }
  };

  const handleCancelPhone = () => {
    setTempPhone(phone);
    setIsEditingPhone(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950 flex items-center justify-center">
        <div className="text-[#64748b]">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">{success}</p>}
        {profileLoading ? (
          <p className="text-[#64748b]">Loading profile...</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="relative group">
                  <img
                    src={profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#dcfce7]"
                  />
                  <label htmlFor="profile-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="w-6 h-6 text-white" />
                  </label>
                  <input id="profile-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
                <div className="flex-1 w-full">
                  <div className="mb-4">
                    {!isEditingName ? (
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl sm:text-3xl font-semibold text-[#0f172a]">{name || 'Your Name'}</h1>
                        <button onClick={() => setIsEditingName(true)} className="p-1.5 text-[#67fc59] hover:bg-[#dcfce7] rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className="text-2xl font-semibold text-[#0f172a] border-b-2 border-[#67fc59] focus:outline-none bg-transparent"
                          autoFocus
                        />
                        <button onClick={handleSaveName} className="p-1.5 text-white bg-[#67fc59] hover:bg-[#52e040] rounded-lg transition-colors">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={handleCancelName} className="p-1.5 text-[#64748b] hover:bg-gray-100 rounded-lg transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-[#64748b] mb-3">{email}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Phone className="w-4 h-4 text-[#64748b]" />
                    {!isEditingPhone ? (
                      <>
                        <span className="text-[#0f172a]">{phone || '—'}</span>
                        <button onClick={() => setIsEditingPhone(true)} className="hover:text-[#52e040] text-sm font-medium flex items-center gap-1 text-[#64748b]">
                          <Edit2 className="w-3 h-3" /> Update
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <input
                          type="tel"
                          value={tempPhone}
                          onChange={(e) => setTempPhone(e.target.value)}
                          className="text-[#0f172a] border-b-2 border-[#67fc59] focus:outline-none bg-transparent"
                          autoFocus
                        />
                        <button onClick={handleSavePhone} className="px-3 py-1 text-white bg-[#67fc59] hover:bg-[#52e040] rounded-lg text-sm">Save</button>
                        <button onClick={handleCancelPhone} className="px-3 py-1 text-[#64748b] hover:bg-gray-100 rounded-lg text-sm">Cancel</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 border-t border-b border-gray-100">
              <div className="p-6 text-center border-r border-gray-100">
                <div className="text-3xl font-bold text-[#010801]">0</div>
                <div className="text-sm text-[#64748b]">Total Rides</div>
              </div>
              <div className="p-6 text-center border-r border-gray-100">
                <div className="text-3xl font-bold text-[#000500]">0 <span className="text-lg">km</span></div>
                <div className="text-sm text-[#64748b]">Distance</div>
              </div>
              <div className="p-6 text-center">
                <div className="text-3xl font-bold text-[#000000]">₹0</div>
                <div className="text-sm text-[#64748b]">Total Savings</div>
              </div>
            </div>
            <div className="p-6 sm:p-8 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-[#0f172a] mb-2">Environmental Impact</h2>
              <p className="text-[#64748b] mb-6">Your contribution to a greener future</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-[#F8FAFC] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#E8FFE8] rounded-full flex items-center justify-center">
                      <Cloud className="w-5 h-5 text-[#5CE65C]" />
                    </div>
                    <h3 className="text-sm font-medium text-[#64748b]">CO₂ Emissions Reduced</h3>
                  </div>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-[#5CE65C]">0.0</span>
                    <span className="text-lg text-[#64748b] ml-1">kg</span>
                  </div>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#E8FFE8] rounded-full flex items-center justify-center">
                      <Wind className="w-5 h-5 text-[#5CE65C]" />
                    </div>
                    <h3 className="text-sm font-medium text-[#64748b]">Equivalent to Trees</h3>
                  </div>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-[#5CE65C]">0.0</span>
                    <span className="text-lg text-[#64748b] ml-1">trees/year</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-[#0f172a] mb-6">Package Bookings</h2>
              <div className="bg-[#f8fafc] rounded-xl p-12 text-center">
                <p className="text-[#64748b]">No package bookings yet</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
