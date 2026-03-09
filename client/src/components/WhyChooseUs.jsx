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
    <section className="pt-6 pb-10 sm:pt-8 sm:pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-zinc-950 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-6 sm:mb-8"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            Why Choose Go ElectriQ?
          </h2>
          <p className="text-lg text-slate-600 dark:text-zinc-400">
            Your trusted partner for sustainable travel
          </p>
        </motion.div>

        {/* Mobile: horizontal slider. sm+: grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible">
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
                className="shrink-0 w-[280px] sm:w-auto snap-center bg-white dark:bg-zinc-900/80 rounded-xl p-6 text-center hover:shadow-lg hover:shadow-[#5CE65C]/10 dark:hover:shadow-[#5CE65C]/10 transition-all duration-300 border border-slate-200 dark:border-zinc-800 hover:border-[#5CE65C] dark:hover:border-[#5CE65C] group"
              >
                <motion.div
                  className="w-16 h-16 bg-slate-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#5CE65C] transition-colors duration-200"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon className="w-8 h-8 text-slate-700 dark:text-zinc-200 group-hover:text-white transition-colors" />
                </motion.div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-zinc-400">
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