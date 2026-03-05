import { Car, Plane, MapPinned, Building2, Route } from 'lucide-react';

const services = [
  {
    icon: MapPinned,
    title: 'Travel Tours Packages',
    description: 'Explore beautiful destinations with our curated travel tours',
  },
  {
    icon: Building2,
    title: 'Temple Tours Packages',
    description: 'Spiritual journeys to sacred temples and religious sites',
  },
  {
    icon: Car,
    title: 'City Ride',
    description: 'Quick and comfortable rides within the city',
  },
  {
    icon: Plane,
    title: 'Airport Ride',
    description: 'Hassle-free airport transfers at your convenience',
  },
  {
    icon: Route,
    title: 'Intercity Ride',
    description: 'Travel comfortably between cities',
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] mb-4">
            Our Services
          </h2>
          <div className="w-20 h-1 bg-[#5CE65C] mx-auto"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-6 border border-[#E5E7EB] hover:border-[#5CE65C] hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 bg-[#E8FFE8] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#5CE65C] transition-colors">
                  <Icon className="w-7 h-7 text-[#5CE65C] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-[#0f172a] mb-2 text-lg">
                  {service.title}
                </h3>
                <p className="text-[#64748b] text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}