import { Leaf, Shield, Clock, DollarSign } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Eco Friendly',
    description: 'All our vehicles are environment-friendly with low emissions',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Verified drivers and 24/7 customer support',
  },
  {
    icon: Clock,
    title: 'Always On Time',
    description: 'Punctual service with real-time tracking',
  },
  {
    icon: DollarSign,
    title: 'Best Prices',
    description: 'Transparent pricing with no hidden charges',
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#111827] to-[#1F2937] text-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#5CE65C] rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5CE65C] rounded-full opacity-10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose <span className="text-[#5CE65C]">Go Electriq</span>?
          </h2>
          <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
            Your trusted partner for sustainable travel
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-[#E8FFE8] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-10 h-10 text-[#5CE65C]" />
                </div>
                <h3 className="font-semibold text-xl mb-3">{feature.title}</h3>
                <p className="text-[#64748B] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}