import { useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  CalendarDays,
  FileText,
  GraduationCap,
  Phone,
  MapPin,
  Send,
  User,
} from "lucide-react";
import { PageHero } from "@/components/public/PageHero";
import { siteContent } from "@/data/siteContent.data";

const stepIcons = {
  1: ClipboardList,
  2: FileText,
  3: GraduationCap,
  4: CalendarDays,
};

export function AdmissionsPage() {
  const [sent, setSent] = useState(false);
  const { admissionsGuide, admissionsSession, contact } = siteContent;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="w-full flex flex-col">
      <PageHero
        title="Admissions"
        subtitle="Apply online for the upcoming academic session. Our admissions team reviews every application and guides you through enrollment."
        crumb="Admissions"
      />

      {/* Step guide */}
      <section className="py-20 bg-background border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2">
              Step-by-Step Admissions Guide
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {admissionsGuide.map((step) => {
              const Icon = stepIcons[step.step] || ClipboardList;
              return (
                <div key={step.step} className="flex flex-col items-center text-center group">
                  <div className="size-14 rounded-full bg-surface border-2 border-primary text-primary flex items-center justify-center shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mb-4">
                    <Icon className="size-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-text-muted">
                    Step {step.step}
                  </span>
                  <h3 className="text-base font-bold text-text-primary group-hover:text-primary transition-colors mt-1">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Online Application
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight mt-2 mb-2">
                Admission Application Form
              </h2>
              <p className="text-sm text-text-secondary mb-8 max-w-xl">
                Complete the form below and our admissions office will contact you within one working day.
              </p>

              {sent ? (
                <div className="bg-success-light border border-success/20 rounded-xl p-8 text-center">
                  <CheckCircle2 className="size-10 text-success mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-success-foreground">Application Submitted!</h3>
                  <p className="text-sm text-text-secondary mt-1 max-w-md mx-auto">
                    Thank you for applying to {siteContent.schoolTag || siteContent.schoolName}. Our admissions office will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="studentName" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Student Full Name <span className="text-error">*</span>
                    </label>
                    <input
                      id="studentName"
                      type="text"
                      required
                      placeholder="Student's full name"
                      className="w-full bg-surface border border-border rounded-md px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="fatherName" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Father Name <span className="text-error">*</span>
                    </label>
                    <input
                      id="fatherName"
                      type="text"
                      required
                      placeholder="Father's full name"
                      className="w-full bg-surface border border-border rounded-md px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="requestedClass" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Requested Class <span className="text-error">*</span>
                    </label>
                    <select
                      id="requestedClass"
                      required
                      defaultValue=""
                      className="w-full bg-surface border border-border rounded-md px-3.5 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="" disabled>Select a class</option>
                      <option value="6">Grade 6</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Parent Phone Number <span className="text-error">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder="e.g. +1 234 567 8900"
                      className="w-full bg-surface border border-border rounded-md px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full bg-surface border border-border rounded-md px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Permanent Address <span className="text-error">*</span>
                    </label>
                    <textarea
                      id="address"
                      required
                      rows={3}
                      placeholder="House, street, area, city"
                      className="w-full bg-surface border border-border rounded-md px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-y"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="previousSchool" className="block text-sm font-medium text-text-secondary mb-1.5">
                      Previous School
                    </label>
                    <input
                      id="previousSchool"
                      type="text"
                      placeholder="Name of previous school (if any)"
                      className="w-full bg-surface border border-border rounded-md px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover active:bg-primary-active transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      <Send className="size-4" />
                      <span>Submit Application</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Side info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-primary-muted border border-border rounded-xl p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                    <User className="size-5" />
                  </div>
                  <h3 className="text-base font-bold text-text-primary">What You'll Need</h3>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-text-secondary leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="size-4 rounded-full bg-primary-light flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="size-2.5 text-primary" />
                    </span>
                    <span>Student's birth certificate or B-form</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-4 rounded-full bg-primary-light flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="size-2.5 text-primary" />
                    </span>
                    <span>Copy of previous school's latest report card</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-4 rounded-full bg-primary-light flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="size-2.5 text-primary" />
                    </span>
                    <span>Two recent passport-size photographs</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="size-4 rounded-full bg-primary-light flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="size-2.5 text-primary" />
                    </span>
                    <span>Parent's CNIC or ID for the student record</span>
                  </li>
                </ul>
              </div>

              <div className="bg-surface border border-border rounded-xl p-6 sm:p-8 shadow-card">
                <h3 className="text-base font-bold text-text-primary mb-4">Admissions Office</h3>
                <div className="space-y-3 text-sm text-text-secondary">
                  <p className="inline-flex items-center gap-2.5">
                    <Phone className="size-4 text-primary shrink-0" />
                    {contact.phone}
                  </p>
                  <p className="inline-flex items-center gap-2.5">
                    <MapPin className="size-4 text-primary shrink-0" />
                    {contact.address}
                  </p>
                  <p className="text-xs text-text-muted mt-3">{contact.timings}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}