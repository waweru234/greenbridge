import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";

function Instagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
import logo from "@/assets/logo.png";
import krisilLogo from "@/assets/krisil-logo.png";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 bg-forest text-white" style={{ background: "var(--forest)" }}>
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="bg-white/95 inline-flex rounded-xl p-2">
            <img src={logo} alt="Greenbridge Energy" className="h-10 w-auto" />
          </div>
          <p className="mt-4 max-w-md text-white/75 leading-relaxed">
            Greenbridge Energy Limited bridges the UK and Africa with clean,
            affordable, future-ready power — from solar farms to wind grids.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-white/75 text-sm">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/projects" className="hover:text-white">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">
            Reach us
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-[color:var(--sun)] shrink-0" />
              <span>
                <span className="block text-white/95 font-medium">🇬🇧 Manchester, UK</span>
                34 Lullington Close, M22 1LY
              </span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-[color:var(--sun)] shrink-0" />
              <span>
                <span className="block text-white/95 font-medium">🇰🇪 Nairobi, Kenya</span>
                Mombasa Rd – Beijing Rd · P.O. Box 871-00241
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[color:var(--sun)] shrink-0" />
              <span>+44 7520 674133 · +254 723 363636</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[color:var(--sun)] shrink-0" />
              <a href="mailto:greenbridgegy@outlook.com" className="hover:text-white">greenbridgegy@outlook.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-[color:var(--sun)] shrink-0" />
              <a href="https://instagram.com/greenbridgeenergyltd" target="_blank" rel="noopener noreferrer" className="hover:text-white">@greenbridgeenergyltd</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-xs text-white/60 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Greenbridge Energy Limited. All rights reserved.</span>
          <span>Bridging Clean Energy between the UK and Africa.</span>
          <a href="https://krisil.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/70 hover:text-white">
            <img src={krisilLogo} alt="Krisil" className="h-6 w-auto" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            <span>Web design by Krisil</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
