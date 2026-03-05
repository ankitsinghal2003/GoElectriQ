import { Star } from 'lucide-react';
import ImageWithFallback from './common/ImageWithFallback';

const reviews = [
  {
    photo: 'https://images.unsplash.com/photo-1671450960874-0903baf942c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBpbmRpYW4lMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTU2NDA2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    name: 'Rahul Sharma',
    role: 'Business Professional',
    rating: 5,
    review: 'Go Electriq has been my go-to service for all my business trips. Professional drivers and clean vehicles.'
  },
  {
    photo: 'https://images.unsplash.com/photo-1704927768421-bc9549b5097d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MTY1NTkyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    name: 'Priya Patel',
    role: 'Travel Blogger',
    rating: 5,
    review: 'Love the eco-friendly approach! The electric vehicles are so smooth and the service is excellent.'
  },
  {
    photo: 'https://images.unsplash.com/photo-1636700312896-6ed5091ae696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGluZGlhbiUyMHByb2Zlc3Npb25hbCUyMG1hbGV8ZW58MXx8fHwxNzcxNTY0MDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    name: 'Amit Kumar',
    role: 'Corporate Executive',
    rating: 5,
    review: 'Reliable and affordable. I use Go Electriq daily for my office commute. Highly recommended!'
  }
];

export default function CustomerReviews() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0f172a] dark:text-gray-100 mb-3">
            What Our Customers Say
          </h2>
          <p className="text-lg text-[#64748b] dark:text-gray-400">
            Trusted by thousands of happy riders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg transition-all hover:border-[#67fc59] dark:hover:border-[#5CE65C]"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#64748b] dark:text-gray-400 mb-6 leading-relaxed">
                "{review.review}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <ImageWithFallback
                    src={review.photo}
                    alt={review.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[#0f172a] dark:text-gray-100">{review.name}</p>
                  <p className="text-sm text-[#64748b] dark:text-gray-400">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}