import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="docked full-width top-0 sticky z-50 bg-surface/80 glass-nav border-b border-surface-variant/30 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-20 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-95 transition-opacity group">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-100 bg-white flex items-center justify-center">
            <Image src="/images/logo.png" alt="CityHealth Logo" width={40} height={40} className="object-cover scale-110" />
          </div>
          <span className="font-display-lg text-headline-sm font-extrabold text-primary tracking-tight">
            City<span className="text-secondary">Health</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="/#services">
            Services
          </Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="/#doctors">
            Doctors
          </Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="/#about">
            About
          </Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md" href="/#contact">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/#booking" className="bg-primary text-on-primary px-6 py-3 rounded-full font-button hover:scale-95 transition-transform duration-200">
            Book Appointment
          </Link>
        </div>
      </div>
    </header>
  );
}
