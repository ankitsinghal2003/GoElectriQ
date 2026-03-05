import { Star } from 'lucide-react';
import ImageWithFallback from './common/ImageWithFallback';

const reviews = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Business Professional',
    rating: 5,
    review:
      'Go Electriq has been my go-to service for all my business trips. Professional drivers and clean vehicles.',
    image: 'https://images.unsplash.com/photo-1671450960874-0903baf942c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYWxlJTIwcHJvZmVzc2lvbmFsJTIwYnVzaW5lc3NtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzE2NTU2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Travel Blogger',
    rating: 5,
    review:
      'Love the eco-friendly approach! The electric vehicles are so smooth and the service is excellent.',
    image: 'https://images.unsplash.com/photo-1770627016447-cb9d29ed0398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmZW1hbGUlMjBwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc3MTY1NTYyMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Amit Kumar',
    role: 'Corporate Executive',
    rating: 5,
    review:
      'Reliable and affordable. I use Go Electriq daily for my office commute. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1664101606938-e664f5852fac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBzbWlsaW5nJTIwY29ycG9yYXRlJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MTY1NTYyMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function CustomerReviewsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f172a] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-[#64748b] text-lg">
            Trusted by thousands of happy riders
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 border border-[#E5E7EB]"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]"
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#64748b] leading-relaxed mb-6">
                "{review.review}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <ImageWithFallback
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-[#0f172a]">
                    {review.name}
                  </h4>
                  <p className="text-sm text-[#64748b]">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}