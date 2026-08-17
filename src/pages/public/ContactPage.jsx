import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  Clock,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { siteContent } from "@/data/siteContent.data";

const cardIcons = {
  MapPin: MapPin,
  Phone: Phone,
  Mail: Mail,
};

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const { contactPage, contact } = siteContent;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="w-full flex flex-col">
      <PageHero
        eyebrow={contactPage.heroEyebrow}
        title={contactPage.heroTitle}
        subtitle={contactPage.heroSubtitle}
        crumb="Contact"
      />

      {/* Contact cards */}
      <section className="py-16 bg-background border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactPage.cards.map((card) => {
              const Icon = cardIcons[card.icon] || MapPin;
              return (
                <div
                  key={card.title}
                  className="bg-surface border border-border rounded-xl p-6 shadow-card hover:shadow-md transition-all text-center"
                >
                  <div className="mx-auto size-12 rounded-xl bg-primary-light flex items-center justify-center text-primary mb-4">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-base font-bold text-text-primary">{card.title}</h3>
                  <div className="mt-2 space-y-1 text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {card.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Message form + departments */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Send a Message</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2 mb-8">
                We'd Love to Hear From You
              </h2>

              {sent ? (
                <div className="bg-success-light border border-success/20 rounded-xl p-8 text-center">
                  <CheckCircle2 className="size-10 text-success mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-success-foreground">Message Sent!</h3>
                  <p className="text-sm text-text-secondary mt-1 max-w-md mx-auto">
                    Thank you for reaching out. Our office will get back to you within one working day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Full Name <span className="text-error">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full bg-surface border border-border rounded-md px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Email Address <span className="text-error">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full bg-surface border border-border rounded-md px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Subject <span className="text-error">*</span>
                    </label>
                    <select
                      id="subject"
                      required
                      defaultValue=""
                      className="w-full bg-surface border border-border rounded-md px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      <option value="admissions">Admissions & Enrollment</option>
                      <option value="academics">Academics & Curriculum</option>
                      <option value="fees">Fees & Accounts</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Message <span className="text-error">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="How can we help?"
                      className="w-full bg-surface border border-border rounded-md px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-y"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover active:bg-primary-active transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <Send className="size-4" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Departments + office hours */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-surface border border-border rounded-xl shadow-card p-6 sm:p-8">
                <h3 className="text-lg font-bold text-text-primary mb-5">Department Contacts</h3>
                <ul className="space-y-4">
                  {contactPage.departments.map((dept) => (
                    <li key={dept.name} className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{dept.name}</p>
                        <a
                          href={`mailto:${dept.email}`}
                          className="text-xs text-primary hover:text-primary-hover mt-0.5 block"
                        >
                          {dept.email}
                        </a>
                      </div>
                      <a
                        href={`tel:${dept.phone.replace(/[^0-9+]/g, "")}`}
                        className="text-xs text-text-secondary hover:text-primary shrink-0"
                      >
                        {dept.phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary-muted border border-border rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                    <Clock className="size-5" />
                  </div>
                  <h3 className="text-base font-bold text-text-primary">Office Hours</h3>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-text-secondary">
                  <div className="flex items-center justify-between gap-3">
                    <span>Monday – Friday</span>
                    <span className="font-semibold text-text-primary">8:00 AM – 2:30 PM</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Saturday</span>
                    <span className="font-semibold text-text-primary">8:00 AM – 12:30 PM</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Sunday</span>
                    <span className="font-semibold text-text-muted">Closed</span>
                  </div>
                </div>
                <div className="mt-5 pt-5 border-t border-border space-y-2.5 text-sm">
                  <p className="inline-flex items-center gap-2 text-text-secondary">
                    <MapPin className="size-4 text-primary shrink-0" />
                    {contact.address}
                  </p>
                  <p className="inline-flex items-center gap-2 text-text-secondary">
                    <Phone className="size-4 text-primary shrink-0" />
                    {contact.phone}
                  </p>
                  <p className="inline-flex items-center gap-2 text-text-secondary">
                    <Mail className="size-4 text-primary shrink-0" />
                    {contact.email}
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between bg-background border border-border rounded-xl p-6 hover:border-primary transition-colors"
              >
                <div>
                  <h3 className="text-base font-bold text-text-primary">Find Us on the Map</h3>
                  <p className="text-xs text-text-muted mt-1">Open directions in Google Maps</p>
                </div>
                <ChevronRight className="size-5 text-primary group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}