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
    <section className="pt-6 pb-12 sm:pt-8 sm:pb-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-3">
            What Our Customers Say
          </h2>
          <p className="text-lg text-slate-600 dark:text-zinc-400">
            Trusted by thousands of happy riders
          </p>
        </div>

        {/* Mobile: horizontal slider. md+: grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[300px] md:w-auto snap-center bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg hover:shadow-[#5CE65C]/10 dark:hover:shadow-[#5CE65C]/10 transition-all duration-300 hover:border-[#5CE65C]"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-slate-600 dark:text-zinc-400 mb-6 leading-relaxed">
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
                  <p className="font-semibold text-slate-900 dark:text-white">{review.name}</p>
                  <p className="text-sm text-slate-500 dark:text-zinc-400">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}