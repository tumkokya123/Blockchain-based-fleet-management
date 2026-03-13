import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import OperationsSection from "./OperationsSection";
import CustomerSection from "./CustomerSection";
import TechnologySection from "./TechnologySection";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="bg-[#222831] text-[#EEEEEE]">
      <Navbar />
      <HeroSection />
      <OperationsSection />
      <CustomerSection />
      <TechnologySection />
      <Footer />
    </div>
  );
}