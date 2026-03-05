import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home';
import AboutPage from './pages/Aboutpage';
import ContactPage from './pages/contactpage';
import PartnerPage from './pages/partnerpage';
import ReferPage from './pages/Referpage';
import FeedbackPage from './pages/feedbackpage';
import PoliciesPage from './pages/policiespage';
import ProfilePage from './pages/profilepage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CityRidePage from './pages/cityride';
import AirportRidePage from './pages/Airportride';
import IntercityRidePage from './pages/intercityridepage';
import AdminPage from './pages/Adminpage';
import { useAuth } from './context/AuthContext.jsx';

function AdminRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user || user.role !== 'admin') return <Navigate to="/" replace />;
  return <AdminPage />;
}

function Layout() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors">
        <Outlet />
      </main>
    </>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-gray-950 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl sm:text-7xl font-bold text-[#0f172a] dark:text-gray-100 mb-2">404</h1>
        <p className="text-base sm:text-lg text-[#64748b] dark:text-gray-400 mb-6">Page not found</p>
        <a href="/" className="inline-block px-6 py-3 bg-[#5CE65C] text-white rounded-lg hover:bg-[#4ED84E] font-medium transition-colors">Go home</a>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/refer" element={<ReferPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cityride" element={<CityRidePage />} />
          <Route path="/airport" element={<AirportRidePage />} />
          <Route path="/intercityride" element={<IntercityRidePage />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
