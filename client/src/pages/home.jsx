import Hero from '../components/Hero';
import Services from '../components/Services';
import TravelTours from '../components/TravelTours';
import TempleTours from '../components/TempleTours';
import WhyChooseUs from '../components/WhyChooseUs';
import CustomerReviews from '../components/CustomerReviews';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-['Poppins']">
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
