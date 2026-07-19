import Link from 'next/link';
import { Clock, Check } from 'lucide-react';

export default function Doctors() {
  return (
    <section id="doctors" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Meet Our Doctors</h2>
          <p className="text-xl font-medium text-gray-600 max-w-3xl mx-auto">
            Our experienced team of homeopathic doctors is dedicated to providing you with the best natural healthcare solutions.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Dr. Basil AP */}
          <div className="w-[350px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
            <div className="aspect-[3/4] overflow-hidden relative">
              <img 
                src="/images/dr-basil.jpg" 
                alt="Dr. Basil AP" 
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Basil AP</h3>
              <p className="text-blue-600 font-semibold mb-2">Chief Homeopath &amp; Founder</p>
              <p className="text-gray-600 text-sm font-medium mb-3">BHMS, MD (Homeopathy)</p>
              
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-600">15+ Years Experience</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-600">1000+ Patients Treated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-600">Chronic Disease Specialist</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-600">Research in Homeopathy</span>
                </div>
              </div>
              
              <Link 
                href="#booking" 
                className="mt-6 block w-full bg-secondary text-white text-sm font-semibold py-3 rounded-lg hover:bg-secondary/90 transition-colors whitespace-nowrap cursor-pointer text-center"
              >
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Dr. Sidrathul Munthaha */}
          <div className="w-[350px] bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
            <div className="aspect-[3/4] overflow-hidden relative">
              <img 
                src="/images/dr-sidrathul.jpg" 
                alt="Dr. Sidrathul Munthaha" 
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dr. Sidrathul Munthaha</h3>
              <p className="text-blue-600 font-semibold mb-2">Women&#39;s Health Specialist</p>
              <p className="text-gray-600 text-sm font-medium mb-3">BHMS, PGD (Gynecology)</p>
              
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-600">12+ Years Experience</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-600">Women&#39;s Health Expert</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-600">800+ Successful Cases</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-gray-600">Pregnancy Care Specialist</span>
                </div>
              </div>
              
              <Link 
                href="#booking" 
                className="mt-6 block w-full bg-secondary text-white text-sm font-semibold py-3 rounded-lg hover:bg-secondary/90 transition-colors whitespace-nowrap cursor-pointer text-center"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
