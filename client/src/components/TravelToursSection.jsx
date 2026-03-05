import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import ImageWithFallback from './common/ImageWithFallback';

const tours = [
  {
    id: 1,
    name: 'Jaipur City Palace Tour',
    duration: '1 day',
    location: 'Jaipur',
    price: '₹600',
    image: 'https://images.unsplash.com/photo-1524227900966-d81dd3e21fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBjaXR5JTIwcGFsYWNlJTIwaW5kaWElMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcxNjU1NTUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Rajasthan Desert Safari',
    duration: '1 day',
    location: 'Jaisalmer',
    price: '₹5,200',
    image: 'https://images.unsplash.com/photo-1756002257161-8e3c42813200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWphc3RoYW4lMjBkZXNlcnQlMjBsYW5kc2NhcGUlMjBzdW5zZXR8ZW58MXx8fHwxNzcxNjU1NTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Udaipur Lake City Tour',
    duration: '1 day',
    location: 'Udaipur',
    price: '₹5,800',
    image: 'https://images.unsplash.com/photo-1710987759549-db4263464211?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1ZGFpcHVyJTIwbGFrZSUyMHBhbGFjZSUyMGluZGlhfGVufDF8fHx8MTc3MTY1NTU1MXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    name: 'Jaisalmer Fort Tour',
    duration: '1 day',
    location: 'Jaisalmer',
    price: '₹3,200',
    image: 'https://images.unsplash.com/photo-1704637375825-3d3203dd210c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlzYWxtZXIlMjBmb3J0JTIwZ29sZGVuJTIwY2l0eXxlbnwxfHx8fDE3NzE2NTU1NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    name: 'Pushkar Camel Safari',
    duration: '1 day',
    location: 'Pushkar',
    price: '₹3,500',
    image: 'https://images.unsplash.com/photo-1717131554010-06626b1cc138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXNoa2FyJTIwY2FtZWwlMjBmYWlyJTIwcmFqYXN0aGFufGVufDF8fHx8MTc3MTY1NTU1NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

function CustomPrevArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#5CE65C] hover:text-white transition-colors group"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}

function CustomNextArrow({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#5CE65C] hover:text-white transition-colors group"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}

export function TravelToursSection() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="py-16 md:py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] mb-2">
            Travel <span className="text-[#5CE65C]">Tours Packages</span>
          </h2>
          <p className="text-[#64748b] text-lg">
            Explore amazing destinations with our curated tours
          </p>
        </div>

        {/* Tours Slider */}
        <div className="relative px-0 md:px-12">
          <Slider ref={sliderRef} {...settings}>
            {tours.map((tour) => (
              <div key={tour.id} className="px-3">
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <ImageWithFallback
                      src={tour.image}
                      alt={tour.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-[#0f172a] mb-3">
                      {tour.name}
                    </h3>
                    <div className="flex items-center gap-4 mb-4 text-sm text-[#64748b]">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {tour.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {tour.location}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-[#64748b]">Starting from</p>
                        <p className="text-xl font-bold text-[#5CE65C]">
                          {tour.price}
                        </p>
                        <p className="text-xs text-[#64748b]">per car</p>
                      </div>
                      <Button className="bg-[#111827] hover:bg-[#1F2937] text-white">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}