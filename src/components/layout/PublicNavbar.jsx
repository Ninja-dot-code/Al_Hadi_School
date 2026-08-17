import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LogIn,
  FileSearch
} from "lucide-react";
import { siteContent } from "@/data/siteContent.data";
import { cn } from "@/lib/utils";

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ABOUT US", path: "/about" },
    { name: "ACADEMICS", path: "/academics" },
    { name: "FACILITIES", path: "/facilities" },
    { name: "NOTICE BOARD", path: "/notices" },
    { name: "GALLERY", path: "/memories" },
    { name: "CONTACT", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-surface/95 backdrop-blur-md border-b border-border-light shadow-xs">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo & School Name */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="size-9 sm:size-11 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-sm ring-1 ring-black/5 group-hover:scale-105 transition-transform">
              <img
                src={siteContent.schoolLogo}
                alt={siteContent.schoolName}
                className="size-full object-contain p-0.5"
                loading="eager"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                {siteContent.schoolTag || siteContent.schoolName}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium uppercase tracking-widest text-text-muted">
                Excellence in Education
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative px-3 xl:px-3.5 py-2 text-xs xl:text-xs font-bold tracking-wider transition-all duration-200 rounded-md group",
                    active
                      ? "text-primary"
                      : "text-text-secondary hover:text-primary hover:bg-surface-tertiary/60"
                  )}
                >
                  <span>{item.name}</span>
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-primary transition-all duration-300",
                      active ? "w-4/5" : "w-0 group-hover:w-1/2 opacity-0 group-hover:opacity-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              to="/admissions"
              className="inline-flex items-center justify-center px-4 xl:px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs xl:text-sm font-semibold hover:bg-primary-hover active:bg-primary-active transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Online Admission
            </Link>
          </div>

          {/* Mobile Menu Controls */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <Link
              to="/admissions"
              className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold shadow-xs"
            >
              Admission
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-tertiary focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-surface px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-4 py-3 text-sm font-semibold rounded-lg transition-colors flex items-center justify-between",
                    active
                      ? "bg-primary-light text-primary font-bold"
                      : "text-text-secondary hover:bg-surface-tertiary hover:text-text-primary"
                  )}
                >
                  <span>{item.name}</span>
                  {active && <div className="size-1.5 rounded-full bg-primary" />}
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-border-light flex flex-col gap-2.5">
            <Link
              to="/results"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg border border-border text-sm font-semibold text-text-primary hover:bg-surface-tertiary transition-colors"
            >
              <FileSearch className="size-4 text-primary" />
              <span>Check Exam Results</span>
            </Link>
            <Link
              to="/login"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-surface-tertiary text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
            >
              <LogIn className="size-4" />
              <span>Staff Portal Login</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}