import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Life Care Homeopathic Clinic",
  description: "Terms of Service for Life Care Homeopathic Clinic in Manjeri, Malappuram, Kerala.",
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200/80 shadow-sm space-y-8">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full inline-block mb-3">
              Legal Documentation
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-secondary tracking-tight mb-2">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-400 font-medium">Effective Date: July 20, 2026</p>
          </div>

          <p className="text-slate-600 leading-relaxed">
            Welcome to Life Care Homeo Clinic. By accessing or using our website (https://life-care-homeopathic-clinic.vercel.app) and our clinical services, you agree to comply with and be bound by the following terms.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2">1. Medical Disclaimer</h2>
            <p className="text-slate-600 leading-relaxed">
              The content provided on this website—including text, graphics, images, and information about homeopathic treatments—is for informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of our practitioners or other qualified health providers with any questions you may have regarding a medical condition.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2">2. Appointments and Cancellations</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600 leading-relaxed pl-2">
              <li>We strive to honor all scheduled appointments. If you need to cancel or reschedule, we request a minimum of 24 hours notice.</li>
              <li>Life Care Homeo Clinic reserves the right to modify or cancel appointments due to unforeseen circumstances, with prompt notification to the patient.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2">3. Treatment Outcomes</h2>
            <p className="text-slate-600 leading-relaxed">
              Homeopathy is a highly individualized medical system. While we provide evidence-based constitutional care, individual results and healing timelines will vary. We do not guarantee specific outcomes for any treatment or remedy provided.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2">4. User Conduct</h2>
            <p className="text-slate-600 leading-relaxed">
              By using this website, you agree not to submit false information, disrupt the website&apos;s functionality, or use the site for any unlawful purpose.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2">5. Intellectual Property</h2>
            <p className="text-slate-600 leading-relaxed">
              All original content, logos, and materials on this website are the property of Life Care Homeo Clinic and are protected by applicable copyright laws. You may not reproduce or distribute this content without prior written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2">6. Governing Law</h2>
            <p className="text-slate-600 leading-relaxed">
              These Terms of Service are governed by the laws of Kerala, India. Any disputes arising from the use of this website or our services shall be subject to the exclusive jurisdiction of the courts in Malappuram, Kerala.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2">7. Changes to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to update or modify these Terms of Service at any time. Changes will be effective immediately upon posting to this website.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-bold text-primary border-b border-slate-100 pb-2">8. Contact Information</h2>
            <p className="text-slate-600 leading-relaxed">
              For any questions regarding these terms, please reach out to us at:
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 text-slate-700 text-sm space-y-1 font-medium">
              <p className="font-bold text-secondary text-base">Life Care Homeo Clinic</p>
              <p>Email: basilhappyhome@gmail.com</p>
              <p>Phone: +91 77366 43050</p>
            </div>
          </section>

          <div className="pt-6 flex justify-start">
            <Link href="/" className="inline-flex items-center gap-2 text-secondary font-bold hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Home
            </Link>
          </div>
        </div>
    </div>
  );
}
