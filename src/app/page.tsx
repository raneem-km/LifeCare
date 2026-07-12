import Image from "next/image";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import TestimonialsSection from "@/components/TestimonialsSection";
import { getReviews } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default async function Home() {
  const dbReviews = await getReviews();
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[870px] flex items-center overflow-hidden">
        {/* Background Hospital Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/clinic-building.jpg" 
            alt="CityHealth Clinic Building" 
            fill 
            className="object-cover object-center" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/95 to-surface/20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-md items-center py-xl relative z-10">
          <div className="space-y-sm md:col-span-8 pr-0 lg:pr-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-label-md font-bold uppercase tracking-wider backdrop-blur-md">
              Your Trusted Local Clinic
            </span>
            <h1 className="font-display-lg text-display-lg leading-tight text-primary">
              Compassionate Care, <span className="text-secondary">Centered Around You</span>
            </h1>
            <p className="text-on-surface-variant text-body-lg max-w-3xl">
              Experience personalized medical care at CityHealth Clinic. Our dedicated team of primary care<br className="hidden lg:block"/> physicians is here to support your everyday health and well-being in a friendly, comfortable environment.
            </p>
            <div className="flex flex-wrap gap-md pt-sm items-center">
              <Link
                href="#booking"
                className="inline-flex shrink-0 items-center justify-center rounded-2xl h-14 px-8 text-lg font-bold shadow-lg shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/80 transition-all"
              >
                Book Appointment
              </Link>
              <Link
                href="#services"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl h-14 px-6 text-lg font-bold text-primary border border-primary/20 hover:bg-primary/5 transition-all bg-white/50 backdrop-blur-sm"
              >
                <span className="material-symbols-outlined">medical_services</span>
                View Our Services
              </Link>
              <div className="flex items-center gap-2.5 bg-white/85 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200 shadow-sm ml-0 md:ml-4">
                <div className="bg-emerald-100 p-1.5 rounded-xl text-emerald-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold text-slate-900">5k+</span>
                  <span className="text-slate-500 text-sm font-semibold">Happy Patients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-2xl bg-surface-bright" id="services">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-xl">
            <h2 className="text-headline-md font-bold text-primary mb-4">Our Clinic Services</h2>
            <p className="text-on-surface-variant max-w-4xl mx-auto">
              Comprehensive healthcare solutions tailored for your everyday needs.<br className="hidden lg:block"/> From routine checkups to minor procedures.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-soft border border-surface-variant/30 hover:border-secondary/50 transition-all group shadow-hover flex flex-col items-start">
              <div className="bg-secondary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                <span className="material-symbols-outlined text-secondary group-hover:text-on-secondary">medical_services</span>
              </div>
              <h3 className="text-headline-sm font-bold text-primary mb-3">General Consultation</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">Expert primary care for fevers, infections, and common illnesses for patients of all ages.</p>
              <Link href="#services" className="inline-flex items-center gap-1 group-hover:gap-2 p-0 text-secondary font-bold transition-all">
                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-soft border border-surface-variant/30 hover:border-secondary/50 transition-all group shadow-hover flex flex-col items-start">
              <div className="bg-secondary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                <span className="material-symbols-outlined text-secondary group-hover:text-on-secondary">health_and_safety</span>
              </div>
              <h3 className="text-headline-sm font-bold text-primary mb-3">Preventative Care</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">Routine health checkups, blood pressure monitoring, and wellness plans to keep you healthy.</p>
              <Link href="#services" className="inline-flex items-center gap-1 group-hover:gap-2 p-0 text-secondary font-bold transition-all">
                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-soft border border-surface-variant/30 hover:border-secondary/50 transition-all group shadow-hover flex flex-col items-start">
              <div className="bg-secondary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                <span className="material-symbols-outlined text-secondary group-hover:text-on-secondary">vaccines</span>
              </div>
              <h3 className="text-headline-sm font-bold text-primary mb-3">Vaccinations</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">Standard immunizations for children and adults, including flu shots and travel vaccines.</p>
              <Link href="#services" className="inline-flex items-center gap-1 group-hover:gap-2 p-0 text-secondary font-bold transition-all">
                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-soft border border-surface-variant/30 hover:border-secondary/50 transition-all group shadow-hover flex flex-col items-start">
              <div className="bg-secondary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                <span className="material-symbols-outlined text-secondary group-hover:text-on-secondary">science</span>
              </div>
              <h3 className="text-headline-sm font-bold text-primary mb-3">Diagnostic Lab Tests</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">On-site sample collection for blood work, sugar levels, and other essential diagnostic tests.</p>
              <Link href="#services" className="inline-flex items-center gap-1 group-hover:gap-2 p-0 text-secondary font-bold transition-all">
                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-soft border border-surface-variant/30 hover:border-secondary/50 transition-all group shadow-hover flex flex-col items-start">
              <div className="bg-secondary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                <span className="material-symbols-outlined text-secondary group-hover:text-on-secondary">child_care</span>
              </div>
              <h3 className="text-headline-sm font-bold text-primary mb-3">Pediatrics</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">Gentle and specialized medical care for infants, children, and adolescents in a warm environment.</p>
              <Link href="#services" className="inline-flex items-center gap-1 group-hover:gap-2 p-0 text-secondary font-bold transition-all">
                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-soft border border-surface-variant/30 hover:border-secondary/50 transition-all group shadow-hover flex flex-col items-start">
              <div className="bg-secondary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                <span className="material-symbols-outlined text-secondary group-hover:text-on-secondary">healing</span>
              </div>
              <h3 className="text-headline-sm font-bold text-primary mb-3">Minor Procedures</h3>
              <p className="text-on-surface-variant mb-6 flex-grow">Wound care, minor suturing, dressing changes, and other in-clinic outpatient procedures.</p>
              <Link href="#services" className="inline-flex items-center gap-1 group-hover:gap-2 p-0 text-secondary font-bold transition-all">
                Learn more <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-2xl bg-surface-container-low" id="about">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-center">
            <div className="lg:col-span-7">
              <h2 className="text-headline-md font-bold text-primary mb-6">Why Choose CityHealth?</h2>
              <p className="text-on-surface-variant text-body-lg mb-10">We believe healthcare should be accessible, personal, and stress-free. Our clinic is designed to put you at ease while providing top-notch medical attention.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                <div className="flex flex-col gap-3">
                  <span className="material-symbols-outlined text-secondary text-4xl">schedule</span>
                  <h4 className="font-bold text-primary">Short Wait Times</h4>
                  <p className="text-sm text-on-surface-variant">We respect your time. Walk-ins and appointments are managed efficiently.</p>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="material-symbols-outlined text-secondary text-4xl">clinical_notes</span>
                  <h4 className="font-bold text-primary">Experienced Doctors</h4>
                  <p className="text-sm text-on-surface-variant">Our certified primary care physicians have decades of experience.</p>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="material-symbols-outlined text-secondary text-4xl">biotech</span>
                  <h4 className="font-bold text-primary">Modern Facility</h4>
                  <p className="text-sm text-on-surface-variant">Clean, comfortable, and equipped with modern diagnostic tools.</p>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="material-symbols-outlined text-secondary text-4xl">volunteer_activism</span>
                  <h4 className="font-bold text-primary">Patient First</h4>
                  <p className="text-sm text-on-surface-variant">We listen carefully and build care plans that prioritize your well-being.</p>
                </div>
              </div>
            </div>
            <div className="relative lg:col-span-5">
              <div className="aspect-square bg-primary-container/5 rounded-3xl overflow-hidden p-8 border border-surface-variant relative">
                <Image
                  src="/images/clinic-building.jpg"
                  alt="Exterior of CityHealth Clinic"
                  fill
                  className="object-cover rounded-2xl shadow-xl"
                  sizes="(min-width: 1280px) 570px, (min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-secondary text-on-secondary p-8 rounded-2xl shadow-lg hidden md:block">
                <p className="text-4xl font-bold">15+</p>
                <p className="text-sm opacity-90 uppercase tracking-widest font-bold">Years in the Community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Doctors */}
      <section className="py-2xl bg-surface-bright" id="doctors">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-end mb-xl gap-md">
            <div className="max-w-xl">
              <h2 className="text-headline-md font-bold text-primary mb-4">Meet Our Clinic Team</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter justify-center">
            <div className="group">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative">
                <Image alt="Dr. Anjali Sharma" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" fill src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZbxgjKmg7KFJwF7daT81g6_hdF2SQHuxeS9OpKX0hXhKUCZilQPT2_LkvaSoXX8H28iDBMAhjpq8adCRvGg394bAveQLq1rAhs8SpA5VUUvhYra7yHbCBNj1HbmyX54Fy8-OrL7PHJaIrB2akd3PulZfx5D1oGAASMKICWqpq5dq5rc-gDBhy7-MzlZ6yLwy72h-yIapmmUpwVJG0oBR8orSRgSpAXzeSG8HU48TldqeXf2xjjKJP" sizes="(min-width: 1280px) 380px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <Link href="#booking" className="inline-flex w-full h-12 rounded-xl items-center justify-center text-primary bg-surface hover:bg-surface-bright shadow-lg">
                    Book with Anjali
                  </Link>
                </div>
              </div>
              <h4 className="text-headline-sm font-bold text-primary">Dr. Anjali Sharma</h4>
              <p className="text-secondary font-label-md mb-2">Primary Care Physician</p>
              <div className="text-sm text-on-surface-variant space-y-1 mt-3 border-t border-surface-variant/20 pt-3">
                <p><strong>Qualifications:</strong> MBBS, MD (Internal Medicine)</p>
                <p><strong>Specialties:</strong> Preventive Care, Chronic Disease Management</p>
                <p><strong>Available:</strong> Mon, Wed, Fri (9:00 AM - 5:00 PM)</p>
              </div>
            </div>
            <div className="group">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative">
                <Image alt="Dr. Rajesh Varma" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" fill src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzA7R8RBrdGvzA2zogjwWGiie5qo-VX07UxVsdipODdWe6EbdyuYenQJZqoHw2RrucW0Hn9f9R4v9oc6Q9A56du7K7xF3et_7kXA2xm8_5M6FqeSp0wNQsouC0nn9KJELpUL3RJkRPc2GcD7yyG0XTIpOoH5zadhlVAysmBkQ4NLdfe_7YF1CgE5FgeJOre0gA54O0Wbe8NaBfEtfr9B1_BJztPwWPLxJ-BTDYKXuSDEh15bJe0owe" sizes="(min-width: 1280px) 380px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <Link href="#booking" className="inline-flex w-full h-12 rounded-xl items-center justify-center text-primary bg-surface hover:bg-surface-bright shadow-lg">
                    Book with Rajesh
                  </Link>
                </div>
              </div>
              <h4 className="text-headline-sm font-bold text-primary">Dr. Rajesh Varma</h4>
              <p className="text-secondary font-label-md mb-2">Family Medicine</p>
              <div className="text-sm text-on-surface-variant space-y-1 mt-3 border-t border-surface-variant/20 pt-3">
                <p><strong>Qualifications:</strong> MBBS, DNB (Family Medicine)</p>
                <p><strong>Specialties:</strong> Geriatric Care, Lifestyle Disorders</p>
                <p><strong>Available:</strong> Tue, Thu, Sat (10:00 AM - 6:00 PM)</p>
              </div>
            </div>
            <div className="group">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative">
                <Image alt="Dr. Priya Nair" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" fill src="/images/priya_nair.png" sizes="(min-width: 1280px) 380px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <Link href="#booking" className="inline-flex w-full h-12 rounded-xl items-center justify-center text-primary bg-surface hover:bg-surface-bright shadow-lg">
                    Book with Priya
                  </Link>
                </div>
              </div>
              <h4 className="text-headline-sm font-bold text-primary">Dr. Priya Nair</h4>
              <p className="text-secondary font-label-md mb-2">Pediatrician</p>
              <div className="text-sm text-on-surface-variant space-y-1 mt-3 border-t border-surface-variant/20 pt-3">
                <p><strong>Qualifications:</strong> MBBS, MD (Pediatrics)</p>
                <p><strong>Specialties:</strong> Child Immunization, Neonatal Care</p>
                <p><strong>Available:</strong> Mon - Sat (9:00 AM - 1:00 PM)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection initialDbReviews={dbReviews} />

      {/* FAQ Section */}
      <section className="py-2xl bg-surface-bright">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-0">
          <h2 className="text-headline-md font-bold text-primary text-center mb-xl">Frequently Asked Questions</h2>
          <Accordion defaultValue={[]} className="w-full space-y-4">
            <AccordionItem value="item-1" className="border border-surface-variant/50 rounded-2xl bg-surface-container-low px-6 data-[state=open]:bg-surface-container transition-all">
              <AccordionTrigger className="text-body-lg font-bold text-primary hover:no-underline py-6">
                Do you accept walk-in patients?
              </AccordionTrigger>
              <AccordionContent className="text-on-surface-variant pb-6 text-base">
                Yes! We welcome walk-in patients for general consultations and minor illnesses. However, booking an appointment helps minimize your wait time.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-surface-variant/50 rounded-2xl bg-surface-container-low px-6 data-[state=open]:bg-surface-container transition-all">
              <AccordionTrigger className="text-body-lg font-bold text-primary hover:no-underline py-6">
                How should I prepare for my first appointment?
              </AccordionTrigger>
              <AccordionContent className="text-on-surface-variant pb-6 text-base">
                Please bring a valid ID, your health insurance details (if applicable), and a list of your current medications. We recommend arriving 10 minutes early.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-surface-variant/50 rounded-2xl bg-surface-container-low px-6 data-[state=open]:bg-surface-container transition-all">
              <AccordionTrigger className="text-body-lg font-bold text-primary hover:no-underline py-6">
                Do you offer on-site blood tests?
              </AccordionTrigger>
              <AccordionContent className="text-on-surface-variant pb-6 text-base">
                Yes, our clinic has an integrated lab collection center so you can get your diagnostic samples taken immediately after your consultation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Appointment Booking */}
      <section className="py-2xl relative overflow-hidden" id="booking">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="bg-surface-container p-8 md:p-16 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-xl relative z-10 border border-surface-variant/20">
            <div className="w-full md:w-1/2">
              <h2 className="text-headline-md font-bold text-primary mb-6">Schedule Your Visit</h2>
              <p className="text-on-surface-variant mb-8">Take the first step towards better health. Fill out the form or call our clinic desk directly to book an appointment.</p>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary">call</span>
                  </div>
                  <span className="font-bold text-primary">+91 (80) 4000-CLINIC</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary">mail</span>
                  </div>
                  <span className="font-bold text-primary">hello@cityhealthclinic.in</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <BookingForm />
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-full bg-secondary-container/20 -skew-y-6 -z-0"></div>
      </section>

      {/* Map & Contact */}
      <section className="py-2xl bg-surface-bright" id="contact">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-stretch">
            <div className="rounded-3xl overflow-hidden h-[450px] shadow-soft border border-surface-variant/30 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9847242277496!2d77.63782937574888!3d12.972847687342885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a3c6130d2d%3A0xf63eb9b46dfa04bb!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1719572948731!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="bg-surface-container-lowest p-10 rounded-3xl shadow-soft border border-surface-variant/30 flex flex-col justify-center">
              <h2 className="text-headline-md font-bold text-primary mb-8">Visit Our Clinic</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="bg-secondary/10 p-3 rounded-xl">
                    <span className="material-symbols-outlined text-secondary">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-body-lg">Clinic Address</h4>
                    <p className="text-on-surface-variant">Shop No. 12, High Street<br/>Indiranagar, Bengaluru 560038</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="bg-secondary/10 p-3 rounded-xl">
                    <span className="material-symbols-outlined text-secondary">schedule</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-body-lg">Operating Hours</h4>
                    <p className="text-on-surface-variant">Mon - Sat: 9:00 AM - 8:00 PM<br/>Sun: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="bg-secondary/10 p-3 rounded-xl">
                    <span className="material-symbols-outlined text-secondary">directions_car</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-body-lg">Parking</h4>
                    <p className="text-on-surface-variant">Street parking available in front of the clinic.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
