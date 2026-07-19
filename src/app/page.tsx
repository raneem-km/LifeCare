import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import BookingForm from "@/components/BookingForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import ServicesSection from "@/components/ServicesSection";
import Doctors from "@/components/Doctors";
import { getReviews } from "@/app/actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CountUp from "@/components/CountUpWrapper";

export default async function Home() {
  const dbReviews = await getReviews();

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Clinic Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="w-full bg-green-50 rounded-2xl shadow-sm border border-green-100 py-12 px-6 my-10">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x md:divide-green-200">
            
            {/* Stat 1: 15k+ */}
            <div data-aos="fade-up" data-aos-delay="100" className="flex flex-col items-center justify-center text-center">
              <h3 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-2">
                <CountUp end={15} suffix="k+" duration={1.5} />
              </h3>
              <p className="text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">Patients Treated</p>
            </div>

            {/* Stat 2: 15+ */}
            <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col items-center justify-center text-center">
              <h3 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-2">
                <CountUp end={15} suffix="+" duration={1.7} />
              </h3>
              <p className="text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">Years Exp.</p>
            </div>

            {/* Stat 3: 98% */}
            <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col items-center justify-center text-center">
              <h3 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-2">
                <CountUp end={98} suffix="%" duration={2.0} />
              </h3>
              <p className="text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">Satisfaction</p>
            </div>

            {/* Stat 4: 24/7 */}
            <div data-aos="fade-up" data-aos-delay="400" className="flex flex-col items-center justify-center text-center">
              <h3 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-2">
                <CountUp end={24} suffix="/7" duration={1.2} />
              </h3>
              <p className="text-sm md:text-base font-semibold text-gray-600 uppercase tracking-wider">Support</p>
            </div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Meet Our Doctors */}
      <Doctors />

      {/* Why Choose Us */}
      <section className="py-20 bg-white border-y border-slate-200/40" id="about">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-3">
            Why Choose Us
          </span>
          <h2 className="text-headline-md font-bold text-secondary mb-12">The Life Care Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div data-aos="fade-up" data-aos-delay="0" className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                <span className="material-symbols-outlined text-[32px]">science</span>
              </div>
              <h4 className="text-xl font-bold text-secondary mb-3">Root-Cause Healing</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                We blend detailed clinical diagnosis with classical homeopathic principles to address the underlying root cause of your illness, rather than simply suppressing temporary symptoms.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="100" className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                <span className="material-symbols-outlined text-[32px]">person_check</span>
              </div>
              <h4 className="text-xl font-bold text-secondary mb-3">Constitutional Care</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Every patient receives a highly individualized remedy chosen specifically for their unique physical constitution, emotional well-being, and detailed health history.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200" className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                <span className="material-symbols-outlined text-[32px]">verified_user</span>
              </div>
              <h4 className="text-xl font-bold text-secondary mb-3">Gentle &amp; Side-Effect Free</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Our homeopathic medicines are 100% natural, gentle on the body, and completely free from harsh side effects—making them perfectly safe for everyone, from newborns and pregnant women to the elderly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment CTA Block */}
      <section className="py-20 bg-secondary relative overflow-hidden text-center text-white">
        <div className="max-w-4xl mx-auto px-margin-mobile md:px-0 relative z-10 space-y-6">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Ready to start your healing journey?</h2>
          <p className="text-body-lg opacity-90 max-w-4xl mx-auto">
            Consult with our experienced practitioners today. We offer convenient in-clinic and remote video consultations across Kerala.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link className="w-full sm:w-auto bg-primary text-white font-bold px-8 py-4 rounded-xl hover:scale-105 hover:bg-primary/95 transition-all shadow-lg text-lg animate-bounce" href="#booking">
              Book My Appointment
            </Link>
            <a className="w-full sm:w-auto border border-white/20 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2 text-lg" href="tel:+917736643050">
              <span className="material-symbols-outlined">call</span>
              +91 77366 43050
            </a>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection initialDbReviews={dbReviews} />

      {/* Frequently Asked Questions */}
      <section className="py-20 bg-slate-50 border-t border-slate-100" id="faq">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-0">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-3">
              FAQ
            </span>
            <h2 className="text-headline-md font-bold text-secondary">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-500 mt-2">Get expert answers regarding homeopathic treatment at our clinic.</p>
          </div>
          
          <Accordion defaultValue={[]} className="w-full space-y-4">
            <AccordionItem value="faq-1" className="border border-slate-200 rounded-2xl bg-white px-6 data-[state=open]:border-primary transition-all">
              <AccordionTrigger className="text-base md:text-lg font-bold text-secondary hover:no-underline py-5 text-left">
                Is homeopathy effective for migraines?
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 pb-5 text-sm md:text-base leading-relaxed">
                Yes, homeopathy offers personalized treatments that address the root cause of migraines, often reducing frequency and intensity.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2" className="border border-slate-200 rounded-2xl bg-white px-6 data-[state=open]:border-primary transition-all">
              <AccordionTrigger className="text-base md:text-lg font-bold text-secondary hover:no-underline py-5 text-left">
                Can piles be treated without surgery using homeopathy?
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 pb-5 text-sm md:text-base leading-relaxed">
                Yes, many cases of hemorrhoids respond well to homeopathic medicine, providing relief from pain and swelling without surgical intervention.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3" className="border border-slate-200 rounded-2xl bg-white px-6 data-[state=open]:border-primary transition-all">
              <AccordionTrigger className="text-base md:text-lg font-bold text-secondary hover:no-underline py-5 text-left">
                Is online homeopathy consultation available in Kerala?
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 pb-5 text-sm md:text-base leading-relaxed">
                Absolutely. We provide convenient online video consultations for patients across Kerala and beyond.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-4" className="border border-slate-200 rounded-2xl bg-white px-6 data-[state=open]:border-primary transition-all">
              <AccordionTrigger className="text-base md:text-lg font-bold text-secondary hover:no-underline py-5 text-left">
                How does homeopathy help with women's health and PCOD?
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 pb-5 text-sm md:text-base leading-relaxed">
                Homeopathy works to balance hormones naturally, making it highly effective for PCOD, menstrual irregularities, and other women's health concerns.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-5" className="border border-slate-200 rounded-2xl bg-white px-6 data-[state=open]:border-primary transition-all">
              <AccordionTrigger className="text-base md:text-lg font-bold text-secondary hover:no-underline py-5 text-left">
                Is homeopathy safe for children and immunity boosting?
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 pb-5 text-sm md:text-base leading-relaxed">
                Homeopathy is exceptionally safe for children, using gentle, non-toxic remedies to strengthen their natural immune response.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-6" className="border border-slate-200 rounded-2xl bg-white px-6 data-[state=open]:border-primary transition-all">
              <AccordionTrigger className="text-base md:text-lg font-bold text-secondary hover:no-underline py-5 text-left">
                What chronic diseases can be treated with homeopathy in Malappuram?
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 pb-5 text-sm md:text-base leading-relaxed">
                We treat a wide range of chronic conditions including asthma, skin disorders, arthritis, and digestive issues at our Manjeri clinic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-7" className="border border-slate-200 rounded-2xl bg-white px-6 data-[state=open]:border-primary transition-all">
              <AccordionTrigger className="text-base md:text-lg font-bold text-secondary hover:no-underline py-5 text-left">
                How long does homeopathic treatment take to show results?
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 pb-5 text-sm md:text-base leading-relaxed">
                While acute cases can see quick relief, chronic conditions typically require 3-6 months to show significant, long-lasting improvement.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-8" className="border border-slate-200 rounded-2xl bg-white px-6 data-[state=open]:border-primary transition-all">
              <AccordionTrigger className="text-base md:text-lg font-bold text-secondary hover:no-underline py-5 text-left">
                What makes Life Care Homeopathic Clinic different from other clinics?
              </AccordionTrigger>
              <AccordionContent className="text-slate-500 pb-5 text-sm md:text-base leading-relaxed">
                Our 15+ years of experience, personalized treatment protocols, and commitment to evidence-based homeopathic practice set us apart.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Appointment Booking */}
      <section className="py-20 relative overflow-hidden" id="booking">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="bg-slate-50 p-8 md:p-16 rounded-3xl border border-slate-200/60 shadow-xl flex flex-col md:flex-row items-stretch gap-12 relative z-10">
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-3 self-start">
                Booking
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mb-6">Schedule Your Visit</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Take the first step towards recovery and natural well-being. Fill out the form or call our clinic desk directly to book your slot.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <span className="font-bold text-secondary">+91 77366 43050</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <span className="font-bold text-secondary">basilhappyhome@gmail.com</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Locations and Branch Maps */}
      <section className="py-20 bg-white" id="locations">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-3">
              Locations
            </span>
            <h2 className="text-headline-md font-bold text-secondary mb-4">Find Our Clinic Locations</h2>
            <p className="text-slate-500 max-w-3xl mx-auto">
              Visit us at either of our convenient locations in Manjeri for professional homeopathic care and personalized treatment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Card 1: Main Clinic */}
            <div className="bg-slate-50 rounded-3xl overflow-hidden shadow-sm border border-slate-200/50 flex flex-col hover:shadow-lg transition-all duration-300">
              <div className="h-64 w-full relative">
                <iframe
                  title="Main Clinic Location (Manjeri)"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.8!2d76.1194!3d11.1204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba64a6666666667%3A0x0!2zMTHCsDA3JzEzLjQiTiA3NsKwMDcnMDkuOCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  style={{ border: 0 }}
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-secondary mb-4">Main Clinic (JSS Shopping Mall)</h3>
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex gap-3 text-slate-500 text-sm md:text-base">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <span>Kuthukal Junction, C H Bypass, Manjeri, Kerala 676123</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm md:text-base">
                    <span className="material-symbols-outlined text-primary">call</span>
                    <span>+91 77366 43050</span>
                  </div>
                  <div className="flex gap-3 text-slate-500 text-sm md:text-base">
                    <span className="material-symbols-outlined text-primary">schedule</span>
                    <span>Mon-Thu &amp; Sat: 10:00 AM - 1:00 PM, 3:30 - 5:30 PM | Fri: 10:00 AM - 12:00 PM, 3:30 - 5:30 PM</span>
                  </div>
                </div>
                <a
                  className="w-full bg-secondary hover:bg-secondary/90 text-white py-3.5 rounded-xl font-bold text-center transition-all block"
                  href="https://www.google.com/maps/dir/?api=1&destination=11.1204,76.1194"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Card 2: Karaparambu Branch */}
            <div className="bg-slate-50 rounded-3xl overflow-hidden shadow-sm border border-slate-200/50 flex flex-col hover:shadow-lg transition-all duration-300">
              <div className="h-64 w-full relative">
                <iframe
                  title="Karaparambu Branch Location"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.5!2d76.1!3d11.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDA2JzAwLjAiTiA3NsKwMDYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  style={{ border: 0 }}
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-secondary mb-4">Karaparambu Branch</h3>
                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex gap-3 text-slate-500 text-sm md:text-base">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <span>Manjeri Areecode Road, Karaparambu, Kerala, India</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-500 text-sm md:text-base">
                    <span className="material-symbols-outlined text-primary">call</span>
                    <span>+91 77366 43050</span>
                  </div>
                  <div className="flex gap-3 text-slate-500 text-sm md:text-base">
                    <span className="material-symbols-outlined text-primary">schedule</span>
                    <span>Mon-Thu &amp; Sat: 10:00 AM - 1:00 PM, 3:30 - 5:30 PM | Fri: 10:00 AM - 12:00 PM, 3:30 - 5:30 PM</span>
                  </div>
                </div>
                <a
                  className="w-full bg-secondary hover:bg-secondary/90 text-white py-3.5 rounded-xl font-bold text-center transition-all block"
                  href="https://www.google.com/maps/dir/?api=1&destination=11.1,76.1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
