import { Leaf, Shield, Clock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Leaf,
    title: 'Eco Friendly',
    description: 'All our vehicles are environment-friendly with low emissions'
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Verified drivers and 24/7 customer support'
  },
  {
    icon: Clock,
    title: 'Always On Time',
    description: 'Punctual service with real-time tracking'
  },
  {
    icon: DollarSign,
    title: 'Best Prices',
    description: 'Transparent pricing with no hidden charges'
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
  }),
  hover: { scale: 1.03, y: -4 },
};

const titleVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] dark:text-gray-100 mb-3">
            Why Choose Go Electriq?
          </h2>
          <p className="text-lg text-[#64748b] dark:text-gray-400">
            Your trusted partner for sustainable travel
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover="hover"
                className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-100 dark:border-white/20 hover:border-[#67fc59] dark:hover:border-[#5CE65C]"
              >
                <motion.div
                  className="w-16 h-16 bg-[#dcfce7] dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-8 h-8 text-[#67fc59]" />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#0f172a] dark:text-gray-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#64748b] dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}