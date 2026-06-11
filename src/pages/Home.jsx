import Hero           from '../components/sections/Hero';
import ServiceSection from '../components/sections/ServiceSection';
import AboutSection   from '../components/sections/AboutSection';
import ClientSection  from '../components/sections/ClientSection';
import ProcessSection from '../components/sections/ProcessSection';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      <ServiceSection />
      <AboutSection />
      <ClientSection />
      <ProcessSection />
      <ContactSection />
    </>
  );
}