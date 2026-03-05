import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import ImageWithFallback from './common/ImageWithFallback';

const templeTours = [
  {
    id: 1,
    name: 'Khatu Shyam & Salasar Balaji',
    description: 'Visit two divine temples in one trip',
    duration: '1 day',
    location: 'Jaipur',
    price: '₹4,600',
    image: 'https://images.unsplash.com/photo-1701096804916-9161cac36cda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraGF0dSUyMHNoeWFtJTIwdGVtcGxlJTIwcmFqYXN0aGFufGVufDF8fHx8MTc3MTY1NTU3OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Triple Temple Tour',
    description: 'Visit Khatu Shyam Ji, Jeen Mata & Salasar Balaji',
    duration: '1 day',
    location: 'Jaipur',
    price: '₹5,200',
    image: 'https://images.unsplash.com/photo-1647870186205-26ebff5add21?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoaW5kdSUyMHRlbXBsZSUyMGFyY2hpdGVjdHVyZSUyMGdvbGR8ZW58MXx8fHwxNzcxNjU1NTc5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Complete Religious Tour',
    description: 'Complete tour of all major temples',
    duration: '1 day',
    location: 'Jaipur',
    price: '₹5,800',
    image: 'https://images.unsplash.com/photo-1597109216022-71b4810ed4c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJsYSUyMG1hbmRpciUyMGphaXB1ciUyMHdoaXRlJTIwdGVtcGxlfGVufDF8fHx8MTc3MTY1NTU4MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    name: 'Ajmer Sharif Darshan',
    description: 'Ajmer Sharif Dargah Journey',
    duration: '1 day',
    location: 'Jaipur',
    price: '₹3,200',
    image: 'https://images.unsplash.com/photo-1769939280251-746d8e82987d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGFuY2llbnQlMjB0ZW1wbGUlMjBzdW5zZXQlMjBwaWxncmltYWdlfGVufDF8fHx8MTc3MTY1NTU4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    name: 'Duo Package Ajmer Sharif',
    description: 'Ajmer Sharif and Pushkar Ji Journey',
    duration: '1 day',
    location: 'Jaipur',
    price: '₹3,500',
    image: 'https://images.unsplash.com/photo-1695546093421-1ce5bf8a0eec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWVyYSUyMHRlbXBsZSUyMHJhamFzdGhhbiUyMHBpbmt8ZW58MXx8fHwxNzcxNjU1NTg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
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

export function TempleToursSection() {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] mb-2">
            Temple <span className="text-[#5CE65C]">Tours Packages</span>
          </h2>
          <p className="text-[#64748b] text-lg">
            Spiritual journeys to divine temples and sacred places
          </p>
        </div>

        {/* Tours Slider */}
        <div className="relative px-0 md:px-12">
          <Slider ref={sliderRef} {...settings}>
            {templeTours.map((tour) => (
              <div key={tour.id} className="px-3">
                <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#E5E7EB]">
                  <div className="relative h-56 overflow-hidden">
                    <ImageWithFallback
                      src={tour.image}
                      alt={tour.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-lg text-[#0f172a] mb-1">
                      {tour.name}
                    </h3>
                    <p className="text-sm text-[#64748b] mb-3">
                      {tour.description}
                    </p>
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