import { Link } from 'react-router-dom';
import { MessageSquare, Star } from 'lucide-react';
import { useState } from 'react';

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    feedback: ''
  });
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Feedback submitted:', { ...formData, rating });
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', mobile: '', feedback: '' });
      setRating(0);
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950">
      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#008000]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-[#00FF00]" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#212121] mb-4">Share Your Feedback</h1>
          <p className="text-base sm:text-lg text-[#64748b]">
            Your feedback helps us improve our services and serve you better
          </p>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#008000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#00FF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#212121] mb-2">Thank You!</h3>
              <p className="text-[#64748b] text-sm sm:text-base">Your feedback has been submitted successfully</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-[#212121] mb-3">
                  Rate Your Experience
                </label>
                <div className="flex gap-2 justify-center sm:justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 sm:w-10 sm:h-10 ${
                          star <= rating
                            ? 'fill-[#FFFF00] text-[#FFFF00]'
                            : 'text-[#E5E7EB]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#212121] mb-2">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF00] focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Mobile */}
              <div>
                <label htmlFor="mobile" className="block text-sm font-semibold text-[#212121] mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF00] focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>

              {/* Feedback */}
              <div>
                <label htmlFor="feedback" className="block text-sm font-semibold text-[#212121] mb-2">
                  Your Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  value={formData.feedback}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF00] focus:border-transparent resize-none text-sm sm:text-base"
                  placeholder="Share your experience, suggestions, or concerns..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#FFFF00] text-[#212121] py-3 rounded-lg font-semibold hover:bg-[#FFFF00]/90 transition-colors text-sm sm:text-base"
              >
                Submit Feedback
              </button>
            </form>
          )}
        </div>

        {/* Info Cards */}
        {!submitted && (
          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-sm sm:text-base font-semibold text-[#212121] mb-2">We Value Your Opinion</h3>
              <p className="text-xs sm:text-sm text-[#64748b]">
                Every piece of feedback helps us enhance our services and create better experiences
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-sm sm:text-base font-semibold text-[#212121] mb-2">Quick Response</h3>
              <p className="text-xs sm:text-sm text-[#64748b]">
                Our team reviews all feedback and responds to concerns within 24-48 hours
              </p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 sm:mt-8 bg-[#008000] rounded-2xl p-6 sm:p-8 text-center text-white shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Need Immediate Assistance?</h2>
          <p className="mb-6 text-white/90 text-sm sm:text-base">For urgent matters, please contact our support team directly</p>
          <Link
            to="/contact"
            className="inline-block bg-[#FFFF00] text-[#212121] px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#FFFF00]/90 transition-colors text-sm sm:text-base"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
