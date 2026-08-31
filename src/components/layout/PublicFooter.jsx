import { Link } from "react-router-dom";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight
} from "lucide-react";
import { siteContent } from "@/data/siteContent.data";

export function PublicFooter() {
  return (
    <footer className="bg-[#0B132B] text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Contact Info (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-white flex items-center justify-center overflow-hidden shadow-sm ring-1 ring-black/5">
                <img
                  src={siteContent.schoolLogo}
                  alt={siteContent.schoolName}
                  className="size-full object-contain p-0.5"
                  loading="lazy"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {siteContent.schoolTag || siteContent.schoolName}
              </span>
            </div>

            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="size-4.5 text-primary shrink-0 mt-0.5" />
                <span>{siteContent.contact.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4.5 text-primary shrink-0" />
                <span>{siteContent.contact.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4.5 text-primary shrink-0" />
                <span>{siteContent.contact.email}</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="size-9 rounded-full bg-slate-800/80 hover:bg-primary flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="size-9 rounded-full bg-slate-800/80 hover:bg-primary flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Twitter className="size-4" />
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="size-9 rounded-full bg-slate-800/80 hover:bg-primary flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="size-9 rounded-full bg-slate-800/80 hover:bg-primary flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/admissions" className="hover:text-primary transition-colors">
                  Admission Process
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-primary transition-colors">
                  Academic Programs
                </Link>
              </li>
            
              <li>
                <Link to="/activities" className="hover:text-primary transition-colors">
                  Activities
                </Link>
              </li>
              <li>
                <Link to="/staff" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Staff Information</span>
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  Faculty Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portals (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Portals
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/login" className="hover:text-primary transition-colors">
                  Admin Login
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-primary transition-colors">
                  Teacher Login
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-primary transition-colors">
                  Application Form
                </Link>
              </li>
           
            </ul>
          </div>

          {/* Col 4: Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Newsletter
            </h4>
            <p className="text-xs text-slate-400">
              Enter your email for circular updates, datesheets, and event notices.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-slate-900 border border-slate-700 text-sm rounded-md px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                aria-label="Subscribe to circulars"
                className="bg-primary hover:bg-primary-hover active:bg-primary-active text-white p-2.5 rounded-md transition-colors shrink-0"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {siteContent.schoolTag || siteContent.schoolName}. Built for Modern Education.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-slate-300 transition-colors">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
