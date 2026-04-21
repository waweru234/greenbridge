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

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-300 ${
          scrolled ? "" : ""
        }`}
      >
        <div
          className={`glass rounded-2xl flex items-center justify-between px-4 sm:px-5 h-16 transition-shadow ${
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
                  className:
                    "text-primary bg-secondary font-semibold",
                }}
                className="px-4 py-2 rounded-full text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full bg-gradient-bridge text-white px-5 py-2.5 text-sm font-semibold shadow-sun hover:shadow-glow transition-all hover:-translate-y-0.5"
            >
              Free Consultation
            </Link>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-full p-2 text-foreground hover:bg-secondary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-3 shadow-soft">
            <div className="flex flex-col">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-primary bg-secondary" }}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-foreground/80 hover:bg-secondary"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="mt-2 text-center rounded-xl bg-gradient-bridge text-white px-4 py-3 text-sm font-semibold"
              >
                Free Consultation
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
