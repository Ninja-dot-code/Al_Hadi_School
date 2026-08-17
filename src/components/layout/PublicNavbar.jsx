import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  GraduationCap, 
  Menu, 
  X, 
  ArrowRight, 
  Phone,
  Sparkles,
  ChevronDown
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
    { name: "ADMISSIONS", path: "/admissions" },
    { name: "CONTACT", path: "/contact" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-surface shadow-xs transition-all">
      {/* Top Notification / Announcement Bar */}
      <div className="bg-primary text-text-inverse px-4 py-2 text-xs md:text-sm font-medium text-center relative flex items-center justify-center gap-2">
        <span>{siteContent.announcement}</span>
        <Link
          to="/admissions"
          className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 hover:opacity-90 transition-opacity"
        >
          <span>Apply Online Now</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-11 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-sm group-hover:scale-105 transition-transform">
              <GraduationCap className="size-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold tracking-tight text-text-primary group-hover:text-primary transition-colors">
                {siteContent.schoolTag || siteContent.schoolName}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-widest text-text-muted">
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
                    "px-3 py-1.5 text-xs font-semibold tracking-wider transition-colors rounded-sm",
                    active
                      ? "bg-text-primary text-text-inverse"
                      : "text-text-secondary hover:text-primary hover:bg-surface-tertiary"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admissions"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-sm bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover active:bg-primary-active transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Online Admission
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/admissions"
              className="px-3 py-1.5 rounded-sm bg-primary text-primary-foreground text-xs font-semibold"
            >
              Admission
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-text-secondary hover:bg-surface-tertiary focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-surface px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-2.5 text-sm font-semibold rounded-md transition-colors",
                    active
                      ? "bg-primary-light text-primary"
                      : "text-text-secondary hover:bg-surface-tertiary"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-border-light flex flex-col gap-2">
            <Link
              to="/results"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-sm border border-border text-sm font-semibold text-text-primary hover:bg-surface-tertiary"
            >
              Check Exam Results
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-sm bg-surface-tertiary text-sm font-semibold text-text-secondary hover:text-text-primary"
            >
              Staff Portal Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
