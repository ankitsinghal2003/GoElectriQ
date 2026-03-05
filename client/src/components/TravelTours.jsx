import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import ImageWithFallback from './common/ImageWithFallback';
import TourBookingModal from './TourBookingModal';
import { getPackages } from '../services/packageService.js';

const defaultImage = 'https://images.unsplash.com/photo-1683669446872-f956fe268beb?w=1080';

export default function TravelTours() {
  const scrollRef = useRef(null);
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getPackages('travel_tour')
      .then((res) => setTours(res?.data || []))
      .catch(() => setTours([]));
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleBookNow = (tour) => {
    setSelectedTour(tour);
    setIsModalOpen(true);
  };

  return (
    <section id="travel-tours" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] dark:text-gray-100">
            Travel Tours Packages
          </h2>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-[#dcfce7] dark:hover:bg-gray-700 hover:border-[#67fc59] transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#0f172a] dark:text-gray-200" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-[#dcfce7] dark:hover:bg-gray-700 hover:border-[#67fc59] transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#0f172a] dark:text-gray-200" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tours.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 py-8">No travel tours available. Check back later.</p>
          ) : (
            tours.map((tour) => {
              const price = tour.basePrice || tour.pricing?.sedan || 0;
              const discountPct = tour.discount?.percentage || 0;
              const originalPrice = discountPct ? Math.round(price / (1 - discountPct / 100)) : null;
              return (
                <div
                  key={tour._id}
                  className="flex-shrink-0 w-[280px] sm:w-[300px] bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={tour.coverImage || tour.images?.[0] || defaultImage}
                      alt={tour.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-[#0f172a] dark:text-gray-100 mb-2">
                      {tour.title}
                    </h3>
                    <div className="flex items-center text-sm text-[#64748b] dark:text-gray-400 mb-2">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{tour.duration?.days || 1} Day{tour.duration?.days > 1 ? 's' : ''}</span>
                      <span className="mx-2">•</span>
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{tour.location || 'India'}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4 gap-2">
                      <div className="min-w-0">
                        {originalPrice && discountPct ? (
                          <>
                            <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                              ₹{originalPrice.toLocaleString()}
                            </span>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xl font-bold text-[#0f172a] dark:text-gray-100">
                                ₹{price.toLocaleString()}
                              </span>
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400">
                                {discountPct}% off
                              </span>
                            </div>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-[#0f172a] dark:text-gray-100">
                            ₹{price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleBookNow({ ...tour, price, _id: tour._id })}
                        className="px-4 py-2 bg-[#000000] text-white rounded-lg hover:bg-[#52e040] transition-colors text-sm"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
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
    </section>
  );
}