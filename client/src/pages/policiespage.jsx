import { Link } from 'react-router-dom';
import { Shield, FileText } from 'lucide-react';

export default function PoliciesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950">
      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#008000]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-[#00FF00]" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#212121] mb-4">Our Policies</h1>
          <p className="text-base sm:text-lg text-[#64748b]">
            Understanding your rights and our commitments
          </p>
        </div>

        {/* Privacy Policy */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#008000]/10 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#00FF00]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#212121]">Privacy Policy</h2>
          </div>

          <div className="space-y-4 text-[#64748b] leading-relaxed text-sm sm:text-base">
            <p>
              At Go ElectrQ, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, store, and protect your data when you use our electric cab booking services.
            </p>
            
            <h3 className="text-base sm:text-lg font-semibold text-[#212121] mt-6 mb-3">Information We Collect</h3>
            <p>
              We collect personal information including your name, mobile number, email address, location data, payment information, and ride history. This information is collected when you register on our platform, book rides, or interact with our services. Location data is collected only when you use our app to ensure accurate pickup and drop-off services.
            </p>
            
            <p>
              We also collect device information such as IP address, browser type, operating system, and app version to improve our services and ensure platform security. This data helps us optimize user experience and prevent fraudulent activities.
            </p>

            <h3 className="text-base sm:text-lg font-semibold text-[#212121] mt-6 mb-3">How We Use Your Information</h3>
            <p>
              Your personal information is used to provide and improve our services, process bookings, facilitate payments, communicate updates about your rides, send promotional offers (with your consent), and ensure safety and security. We analyze usage patterns to enhance user experience and optimize our operations.
            </p>

            <p>
              We may use your contact information to send important service updates, booking confirmations, payment receipts, and customer support communications. Marketing communications are sent only to users who have opted in, and you can unsubscribe at any time.
            </p>

            <h3 className="text-base sm:text-lg font-semibold text-[#212121] mt-6 mb-3">Data Security</h3>
            <p>
              We implement industry-standard security measures including encryption, secure servers, regular security audits, and access controls to protect your personal information. Payment information is processed through PCI-DSS compliant payment gateways. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h3 className="text-base sm:text-lg font-semibold text-[#212121] mt-6 mb-3">Data Sharing</h3>
            <p>
              We do not sell your personal information to third parties. We may share necessary information with our driver partners to facilitate ride services, payment processors for transaction processing, and law enforcement when required by law. All third-party service providers are bound by confidentiality agreements.
            </p>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#008000]/10 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#00FF00]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#212121]">Terms and Conditions</h2>
          </div>

          <div className="space-y-4 text-[#64748b] leading-relaxed text-sm sm:text-base">
            <p>
              By using Go ElectrQ services, you agree to comply with these terms and conditions. Please read them carefully before using our platform.
            </p>
            
            <h3 className="text-base sm:text-lg font-semibold text-[#212121] mt-6 mb-3">User Eligibility</h3>
            <p>
              You must be at least 18 years old to use our services. By registering, you confirm that all information provided is accurate and up-to-date. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>

            <h3 className="text-base sm:text-lg font-semibold text-[#212121] mt-6 mb-3">Booking and Payment</h3>
            <p>
              All bookings are subject to availability and confirmation. Fares are calculated based on distance, time, and service type selected. We accept multiple payment methods including cash, UPI, cards, and digital wallets. Payment is due immediately upon completion of the ride unless otherwise agreed.
            </p>

            <p>
              In case of payment disputes, please contact our customer support within 24 hours. We reserve the right to cancel bookings or suspend accounts for non-payment or fraudulent activities.
            </p>

            <h3 className="text-base sm:text-lg font-semibold text-[#212121] mt-6 mb-3">Cancellation Policy</h3>
            <p>
              You may cancel your booking within 5 minutes of placing it without any charges. Cancellations made after 5 minutes or after the driver has arrived at the pickup location will incur cancellation fees. Repeated cancellations may result in temporary account suspension.
            </p>

            <h3 className="text-base sm:text-lg font-semibold text-[#212121] mt-6 mb-3">User Conduct</h3>
            <p>
              Users must treat drivers with respect and courtesy. Any form of harassment, abuse, or misconduct will result in immediate account termination. Smoking, consumption of alcohol, or illegal activities in the vehicle are strictly prohibited. Users are responsible for any damage caused to the vehicle during the ride.
            </p>

            <p>
              We reserve the right to refuse service to anyone who violates these terms or engages in inappropriate behavior. Safety is our top priority, and we maintain zero tolerance for any actions that compromise the well-being of our drivers or other users.
            </p>
          </div>
        </div>

        {/* Refund Policy */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#008000]/10 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#00FF00]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#212121]">Refund Policy</h2>
          </div>

          <div className="space-y-4 text-[#64748b] leading-relaxed text-sm sm:text-base">
            <p>
              We strive to provide excellent service, but we understand that issues may arise. This refund policy outlines the circumstances under which refunds are applicable.
            </p>
            
            <h3 className="text-base sm:text-lg font-semibold text-[#212121] mt-6 mb-3">Eligible Refunds</h3>
            <p>
              Refunds are processed for ride cancellations by drivers, significant service failures, overcharging or billing errors, technical issues preventing ride completion, and rides not provided as booked. Refund requests must be submitted within 48 hours of the ride through our customer support channels.
            </p>

            <h3 className="text-base sm:text-lg font-semibold text-[#212121] mt-6 mb-3">Refund Process</h3>
            <p>
              Once a refund request is approved, the amount will be credited to your original payment method within 5-7 business days. For cash payments, refunds will be credited to your Go ElectrQ wallet for future use. We reserve the right to investigate refund requests and may require additional information or evidence.
            </p>

            <p>
              Partial refunds may be issued in cases where the service was partially completed or if only a portion of the charges were incorrect. Final decisions on refund requests rest with Go ElectrQ management.
            </p>
          </div>
        </div>

        {/* Driver Partner Policy */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#008000]/10 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#00FF00]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#212121]">Driver Partner Policy</h2>
          </div>

          <div className="space-y-4 text-[#64748b] leading-relaxed text-sm sm:text-base">
            <p>
              Our driver partners are the backbone of our service. This policy outlines the expectations and guidelines for all driver partners on the Go ElectrQ platform.
            </p>
            
            <h3 className="text-base sm:text-lg font-semibold text-[#212121] mt-6 mb-3">Partner Requirements</h3>
            <p>
              All driver partners must possess a valid driving license, vehicle registration, and insurance. Electric vehicles must meet our safety and quality standards. Drivers must undergo background verification and training before onboarding. Regular vehicle inspections and document renewals are mandatory.
            </p>

            <h3 className="text-base sm:text-lg font-semibold text-[#212121] mt-6 mb-3">Professional Standards</h3>
            <p>
              Drivers are expected to maintain professionalism at all times, ensure vehicle cleanliness, follow traffic rules, provide courteous service, and respect customer privacy. Drivers must be punctual for pickups and follow the designated route unless requested otherwise by the customer.
            </p>

            <p>
              Any complaints regarding driver behavior or service quality will be investigated, and appropriate action will be taken. Repeated violations may result in partnership termination.
            </p>
          </div>
        </div>

        {/* Contact for Policy Questions */}
        <div className="bg-[#008000] rounded-2xl p-6 sm:p-8 text-center text-white shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Questions About Our Policies?</h2>
          <p className="mb-6 text-white/90 text-sm sm:text-base">
            If you have any questions or concerns about our policies, please don't hesitate to contact us
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[#FFFF00] text-[#212121] px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#FFFF00]/90 transition-colors text-sm sm:text-base"
          >
            Contact Us
          </Link>
        </div>

        {/* Last Updated */}
        <p className="text-center text-xs sm:text-sm text-[#64748b] mt-6 sm:mt-8">
          Last Updated: February 24, 2026
        </p>
      </div>
    </div>
  );
}
