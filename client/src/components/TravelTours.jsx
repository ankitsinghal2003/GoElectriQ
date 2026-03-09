import { ChevronLeft, ChevronRight, MapPin, Clock, Compass } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageWithFallback from './common/ImageWithFallback';
import { getPackageImageUrl } from '../utils/imageUrl.js';
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
    <section id="travel-tours" className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Centered header – same style as Temple Tours */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 bg-white dark:bg-zinc-900 px-3 py-1 rounded-full border border-emerald-500/30 mb-2"
          >
            <Compass className="w-4 h-4 text-[#008000]" />
            <span className="text-xs font-semibold text-[#008000]">EXPLORE INDIA</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-2xl sm:text-3xl font-bold mb-1"
          >
            <span className="text-slate-900 dark:text-white">Travel </span>
            <span className="text-[#008000]">Tours Packages</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-sm text-[#64748b] dark:text-gray-400"
          >
            Discover curated travel packages across India
          </motion.p>
        </div>

        {/* Navigation – same row as Temple Tours */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Popular Packages
          </h3>
          <div className="hidden sm:flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('left')}
              className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-full hover:bg-emerald-600 hover:border-emerald-600 transition-colors duration-200 group"
            >
              <ChevronLeft className="w-4 h-4 text-slate-700 dark:text-zinc-300 group-hover:text-white transition-colors" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('right')}
              className="p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-full hover:bg-emerald-600 hover:border-emerald-600 transition-colors duration-200 group"
            >
              <ChevronRight className="w-4 h-4 text-slate-700 dark:text-zinc-300 group-hover:text-white transition-colors" />
            </motion.button>
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
                  className="flex-shrink-0 w-[280px] sm:w-[300px] bg-white dark:bg-zinc-900/90 rounded-xl overflow-hidden shadow-md hover:shadow-xl dark:shadow-none dark:border dark:border-zinc-800 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={getPackageImageUrl(tour.coverImage, tour.images, defaultImage)}
                      alt={tour.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">
                      {tour.title}
                    </h3>
                    <div className="flex items-center text-sm text-slate-500 dark:text-zinc-400 mb-2">
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
                              <span className="text-xl font-bold text-slate-900 dark:text-white">
                                ₹{price.toLocaleString()}
                              </span>
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400">
                                {discountPct}% off
                              </span>
                            </div>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-slate-900 dark:text-white">
                            ₹{price.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleBookNow({ ...tour, price, _id: tour._id })}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 font-medium transition-colors duration-200 text-sm"
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