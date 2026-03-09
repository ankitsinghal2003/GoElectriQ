import Hero from '../components/Hero';
import Services from '../components/Services';
import TravelTours from '../components/TravelTours';
import TempleTours from '../components/TempleTours';
import WhyChooseUs from '../components/WhyChooseUs';
import CustomerReviews from '../components/CustomerReviews';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-black font-['Poppins'] transition-colors duration-300">
      <Hero />
      <Services />
      <TravelTours />
      <TempleTours />
      <WhyChooseUs />
      <CustomerReviews />
      <Footer />
    </div>
  );
}
