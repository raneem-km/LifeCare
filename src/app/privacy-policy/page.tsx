import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | Life Care Homeopathic Clinic",
  description: "Privacy Policy for Life Care Homeopathic Clinic in Manjeri, Malappuram, Kerala.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full inline-block mb-3">
              Legal Documentation
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-secondary tracking-tight mb-2">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-400 font-medium">Effective Date: July 20, 2026</p>
          </div>

          <p className="text-slate-600 leading-relaxed">
            Welcome to Life Care Homeo Clinic. We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website (https://life-care-homeopathic-clinic.vercel.app) or use our services.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2">1. Information We Collect</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed pl-2">
              <li>
                <strong className="text-slate-800">Personal Information:</strong> When you book an appointment or contact us, we may collect your name, phone number, email address, and demographic details.
              </li>
              <li>
                <strong className="text-slate-800">Health Information:</strong> Any symptoms, medical history, or constitutional details you share with us during consultations or via secure intake forms.
              </li>
              <li>
                <strong className="text-slate-800">Usage Data:</strong> Standard analytics data (such as browser type and IP address) to help us improve our website experience.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed pl-2">
              <li>To schedule and manage your clinic appointments.</li>
              <li>To provide personalized homeopathic treatment plans and remedies.</li>
              <li>To communicate with you regarding your care, clinic updates, or inquiries.</li>
              <li>To improve our website functionality and patient services.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2">3. Data Security</h2>
            <p className="text-slate-600 leading-relaxed">
              Patient confidentiality is our top priority. We implement appropriate physical, electronic, and managerial procedures to safeguard and secure the information we collect online and in our Malappuram clinic.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2">4. Sharing of Information</h2>
            <p className="text-slate-600 leading-relaxed">
              We do not sell, trade, or rent your personal or medical information to third parties. We may only disclose information if required by law or to protect the safety and rights of our clinic and patients.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2">5. Your Rights</h2>
            <p className="text-slate-600 leading-relaxed">
              You have the right to request access to, correction of, or deletion of your personal data stored with us.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2">6. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 text-slate-700 text-sm space-y-1 font-medium">
              <p className="font-bold text-secondary text-base">Life Care Homeo Clinic</p>
              <p>JSS Shopping Mall, Manjeri, Malappuram, Kerala, India</p>
              <p>Phone: +91 77366 43050</p>
              <p>Email: basilhappyhome@gmail.com</p>
            </div>
          </section>

          <div className="pt-6 flex justify-start">
            <Link href="/" className="inline-flex items-center gap-2 text-secondary font-bold hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
