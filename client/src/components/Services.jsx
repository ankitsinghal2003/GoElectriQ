import { Palmtree, Church, Building2, Plane, MapPin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Palmtree,
    title: 'Travel Tours Packages',
    description: 'Explore scenic destinations with comfortable electric rides',
    link: '/',
    scrollTo: 'travel-tours'
  },
  {
    icon: Church,
    title: 'Temple Tours Packages',
    description: 'Visit spiritual places with eco-friendly transportation',
    link: '/',
    scrollTo: 'temple-tours'
  },
  {
    icon: Building2,
    title: 'City Ride',
    description: 'Quick and comfortable rides across the city',
    link: '/cityride'
  },
  {
    icon: Plane,
    title: 'Airport Ride',
    description: 'Reliable airport transfers at affordable prices',
    link: '/airport'
  },
  {
    icon: MapPin,
    title: 'Intercity Ride',
    description: 'Safe and comfortable long-distance travel',
    link: '/intercityride'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
  hover: { scale: 1.03, y: -4, transition: { duration: 0.2 } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Services() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle scrolling to section after navigation
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location]);

  const handleServiceClick = (service) => {
    if (service.scrollTo) {
      // If on home page, scroll directly
      if (location.pathname === '/') {
        const element = document.getElementById(service.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Navigate to home page with hash
        navigate(`/#${service.scrollTo}`);
      }
    } else {
      // Navigate to the page
      navigate(service.link);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl sm:text-4xl font-bold text-[#0f172a] dark:text-gray-100 text-center mb-12"
        >
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover="hover"
                onClick={() => handleServiceClick(service)}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/25 rounded-xl p-6 hover:shadow-xl hover:border-[#67fc59] dark:hover:border-[#5CE65C] transition-colors cursor-pointer group block text-left w-full shadow-sm"
              >
                <motion.div
                  className="w-14 h-14 bg-[#dcfce7] dark:bg-emerald-900/40 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#67fc59] transition-colors"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <Icon className="w-7 h-7 text-[#67fc59] group-hover:text-white transition-colors" />
                </motion.div>
                <h3 className="font-semibold text-[#0f172a] dark:text-gray-100 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#64748b] dark:text-gray-400">
                  {service.description}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}