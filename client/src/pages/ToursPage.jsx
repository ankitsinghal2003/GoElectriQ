import { useEffect, useMemo, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { getPackages } from '../services/packageService.js';
import ImageWithFallback from '../components/common/ImageWithFallback.jsx';
import { getPackageImageUrl } from '../utils/imageUrl.js';
import TourBookingModal from '../components/TourBookingModal.jsx';

const defaultImage = 'https://images.unsplash.com/photo-1683669446872-f956fe268beb?w=1080';

function TourCard({ tour, onBook }) {
  const price = tour.basePrice || tour.pricing?.sedan || 0;
  const discountPct = tour.discount?.percentage || 0;
  const originalPrice = discountPct ? Math.round(price / (1 - discountPct / 100)) : null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200 dark:border-white/10">
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <ImageWithFallback
          src={getPackageImageUrl(tour.coverImage, tour.images, defaultImage)}
          alt={tour.title || tour.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
            {tour.type === 'temple_tour' ? 'Temple Tour' : 'Travel Tour'}
          </span>
        </div>

        <h3 className="font-semibold text-base sm:text-lg text-[#0f172a] dark:text-gray-100 mb-2 line-clamp-2 min-h-[44px]">
          {tour.title || tour.name}
        </h3>

        <div className="flex items-center text-xs sm:text-sm text-[#64748b] dark:text-gray-400 mb-3">
          <Clock className="w-4 h-4 mr-1 text-[#008000]" />
          <span>{tour.duration?.days || 1} Day{tour.duration?.days > 1 ? 's' : ''}</span>
          <span className="mx-2">•</span>
          <MapPin className="w-4 h-4 mr-1 text-[#008000]" />
          <span>{tour.location || 'India'}</span>
        </div>

        <div className="flex justify-between items-center gap-3">
          <div className="min-w-0">
            {originalPrice && discountPct ? (
              <>
                <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg sm:text-xl font-bold text-[#0f172a] dark:text-gray-100">
                    ₹{price.toLocaleString()}
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400">
                    {discountPct}% off
                  </span>
                </div>
              </>
            ) : (
              <span className="text-lg sm:text-xl font-bold text-[#0f172a] dark:text-gray-100">
                ₹{price.toLocaleString()}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onBook({ ...tour, price })}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-[#52e040] transition-colors text-sm shrink-0"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ToursPage() {
  const [travelTours, setTravelTours] = useState([]);
  const [templeTours, setTempleTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.all([getPackages('travel_tour'), getPackages('temple_tour')])
      .then(([travelRes, templeRes]) => {
        if (!alive) return;
        setTravelTours(travelRes?.data || []);
        setTempleTours(templeRes?.data || []);
      })
      .catch(() => {
        if (!alive) return;
        setTravelTours([]);
        setTempleTours([]);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  const allTours = useMemo(() => {
    const merged = [
      ...(travelTours || []).map((t) => ({ ...t, type: 'travel_tour' })),
      ...(templeTours || []).map((t) => ({ ...t, type: 'temple_tour' })),
    ];

    // Newest first if createdAt exists, otherwise keep as-is
    merged.sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    });

    return merged;
  }, [travelTours, templeTours]);

  const handleBookNow = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0f172a] dark:text-gray-100 mb-2">
            All Tours
          </h1>
          <p className="text-sm sm:text-base text-[#64748b] dark:text-gray-400">
            Browse all Travel Tours and Temple Tours in one place
          </p>
        </div>

        {loading ? (
          <div className="py-16 text-center text-[#64748b] dark:text-gray-400">
            Loading tours...
          </div>
        ) : allTours.length === 0 ? (
          <div className="py-16 text-center text-[#64748b] dark:text-gray-400">
            No tours available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTours.map((tour) => (
              <TourCard key={tour._id} tour={tour} onBook={handleBookNow} />
            ))}
          </div>
        )}
      </div>

      {selectedTour && (
        <TourBookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tourName={selectedTour.title || selectedTour.name}
          packagePrice={selectedTour.price ?? selectedTour.basePrice ?? 0}
          packageId={selectedTour._id}
        />
      )}
    </div>
  );
}

