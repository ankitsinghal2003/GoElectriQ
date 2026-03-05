import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: "How do I book an electric cab?",
      answer: "You can book a cab through our website by selecting your ride type (City Ride, Airport, or Intercity), entering your pickup and drop locations, and confirming your booking."
    },
    {
      question: "What are the payment options available?",
      answer: "We accept cash, UPI, credit/debit cards, and digital wallets. You can choose your preferred payment method during booking or after the ride."
    },
    {
      question: "Are your electric cabs available 24/7?",
      answer: "Yes, our electric cab services are available 24 hours a day, 7 days a week to serve you whenever you need transportation."
    },
    {
      question: "How is the fare calculated?",
      answer: "Fares are calculated based on distance traveled, time duration, and the type of service selected. All charges are transparent with no hidden fees."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking. Free cancellation is available within 5 minutes of booking. Cancellation charges may apply after that."
    },
    {
      question: "How do I become a driver partner?",
      answer: "Visit our 'Partner With Us' page and click on the driver partner option. Fill in your details and our team will contact you with further information."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#212121] mb-4">Contact Us</h1>
          <p className="text-base sm:text-lg text-[#64748b]">We're here to help. Reach out to us anytime!</p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Phone */}
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-[#008000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-[#00FF00]" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-[#212121] mb-2">Phone</h3>
            <a href="tel:+919876543210" className="text-[#008000] hover:text-[#00FF00] transition-colors text-sm sm:text-base">
              +91 98765 43210
            </a>
            <p className="text-xs sm:text-sm text-[#64748b] mt-1">Mon-Sun, 24/7</p>
          </div>

          {/* Email */}
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-[#008000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-[#00FF00]" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-[#212121] mb-2">Email</h3>
            <a href="mailto:support@goelectrq.com" className="text-[#008000] hover:text-[#00FF00] transition-colors break-all text-xs sm:text-sm">
              support@goelectrq.com
            </a>
            <p className="text-xs sm:text-sm text-[#64748b] mt-1">24-48 hour response</p>
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-[#008000]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-[#00FF00]" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-[#212121] mb-2">Head Office</h3>
            <p className="text-[#64748b] text-xs sm:text-sm">
              123 Green Avenue,<br />
              Malviya Nagar, Jaipur,<br />
              Rajasthan - 302017
            </p>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#212121] mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-[#E5E7EB] rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-[#008000]/5 transition-colors"
                >
                  <span className="font-semibold text-[#212121] pr-4 text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#00FF00] flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openFaq === index && (
                  <div className="px-4 pb-4 text-[#64748b] leading-relaxed text-sm sm:text-base">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#008000] rounded-2xl p-6 sm:p-8 text-center shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 text-white">Still have questions?</h2>
          <p className="mb-6 text-white/90 text-sm sm:text-base">Feel free to call or email us. We're always happy to help!</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a 
              href="tel:+919876543210"
              className="inline-block bg-[#FFFF00] text-[#212121] px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#FFFF00]/90 transition-colors text-sm sm:text-base"
            >
              Call Us Now
            </a>
            <a 
              href="mailto:support@goelectrq.com"
              className="inline-block bg-[#212121] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#212121]/90 transition-colors text-sm sm:text-base"
            >
              Send Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
