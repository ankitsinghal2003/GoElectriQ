import { ChevronLeft, ChevronRight, MapPin, Clock, Sparkles } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ImageWithFallback from './common/ImageWithFallback';
import TourBookingModal from './TourBookingModal';
import { getPackages } from '../services/packageService.js';

const defaultImage = 'https://images.unsplash.com/photo-1690476326206-f8c432742734?w=1080';

export default function TempleTours() {
  const scrollRef = useRef(null);
  const [templeTours, setTempleTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getPackages('temple_tour')
      .then((res) => setTempleTours(res?.data || []))
      .catch(() => setTempleTours([]));
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
    <section id="temple-tours" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F5FFF5] dark:bg-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-[#00FF00]/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#008000]/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6"
          >
            <Sparkles className="w-5 h-5 text-[#00FF00]" />
            <span className="text-sm font-semibold text-[#008000]">SPIRITUAL JOURNEYS</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-[#212121]">Sacred </span>
            <span className="text-[#008000]">Temple Tours</span>
          </h2>
          <p className="text-base sm:text-lg text-[#64748b] max-w-2xl mx-auto">
            Experience divine journeys with our curated temple tour packages across India
          </p>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-[#212121]">
              Popular Packages
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="hidden sm:flex gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('left')}
              className="p-3 bg-white border-2 border-[#E5E7EB] rounded-full hover:bg-[#008000] hover:border-[#008000] transition-all duration-300 shadow-md group"
            >
              <ChevronLeft className="w-5 h-5 text-[#212121] group-hover:text-white transition-colors" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('right')}
              className="p-3 bg-white border-2 border-[#E5E7EB] rounded-full hover:bg-[#008000] hover:border-[#008000] transition-all duration-300 shadow-md group"
            >
              <ChevronRight className="w-5 h-5 text-[#212121] group-hover:text-white transition-colors" />
            </motion.button>
          </motion.div>
        </div>

        {/* Tours Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {templeTours.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 py-8">No temple tours available. Check back later.</p>
          ) : templeTours.map((tour, index) => {
            const price = tour.basePrice || tour.pricing?.sedan || 0;
            return (
            <motion.div
              key={tour._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -10 }}
              className="flex-shrink-0 w-[280px] sm:w-[320px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#E5E7EB] group"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full"
                >
                <ImageWithFallback
                  src={tour.coverImage || tour.images?.[0] || defaultImage}
                  alt={tour.title || tour.name}
                  className="w-full h-full object-cover"
                />
                </motion.div>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Price Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                  className="absolute top-4 right-4 bg-[#FFFF00] text-[#212121] px-3 py-1.5 rounded-full font-bold text-sm shadow-lg"
                >
                  ₹{price}
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-lg text-[#212121] mb-3 line-clamp-2 min-h-[56px]">
                  {tour.title || tour.name}
                </h3>
                
                <div className="flex items-center gap-4 text-sm text-[#64748b] mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-[#00FF00]" />
                    <span>{tour.duration?.days || 1} Day</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#00FF00]" />
                    <span>{tour.location || 'Jaipur'}</span>
                  </div>
                </div>

                {/* Book Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBookNow({ ...tour, price, _id: tour._id })}
                  className="w-full bg-[#212121] text-white py-3 rounded-xl font-semibold hover:bg-[#008000] transition-all duration-300 shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Book Now</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="bg-[#FFFF00] text-[#212121] px-8 py-4 rounded-xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto">
              <span>Explore All Tours</span>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            </button>
          </motion.div>
        </motion.div>
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
