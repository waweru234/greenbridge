import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
] as const;

const WHATSAPP_PHONE = "254723363636";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Hi Greenbridge Energy, I would like a free consultation.")}`;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();
  const isHome = location.pathname === "/";
  const overlayMode = isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[80] transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-300 ${
          scrolled ? "" : ""
        }`}
      >
        <div
          className={`rounded-2xl flex items-center justify-between px-4 sm:px-5 h-16 transition-all ${
            overlayMode
              ? "bg-black/35 border border-white/20 backdrop-blur-xl text-white shadow-glow"
              : "glass text-foreground"
          } ${
            scrolled ? "shadow-soft" : ""
          }`}
        >
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Greenbridge Energy logo"
              className="h-10 w-auto"
              width={160}
              height={40}
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{
                  className: overlayMode
                    ? "text-white bg-white/20 font-semibold"
                    : "text-primary bg-secondary font-semibold",
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  overlayMode
                    ? "text-white/85 hover:text-white hover:bg-white/15"
                    : "text-foreground/80 hover:text-primary hover:bg-secondary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
                overlayMode
                  ? "bg-white/15 border border-white/25 text-white hover:bg-white/25"
                  : "bg-gradient-bridge text-white shadow-sun hover:shadow-glow"
              }`}
            >
              Free Consultation
            </a>
          </div>

          <button
            className={`md:hidden inline-flex items-center justify-center rounded-full p-2 transition ${
              overlayMode ? "text-white hover:bg-white/15" : "text-foreground hover:bg-secondary"
            }`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className={`md:hidden mt-2 rounded-2xl p-3 shadow-soft ${
            overlayMode
              ? "bg-black/55 border border-white/15 backdrop-blur-xl text-white"
              : "glass"
          }`}>
            <div className="flex flex-col">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: overlayMode ? "text-white bg-white/20" : "text-primary bg-secondary" }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium ${
                    overlayMode
                      ? "text-white/85 hover:bg-white/15"
                      : "text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 text-center rounded-xl px-4 py-3 text-sm font-semibold ${
                  overlayMode
                    ? "bg-white/15 border border-white/25 text-white hover:bg-white/25"
                    : "bg-gradient-bridge text-white"
                }`}
              >
                Free Consultation
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
