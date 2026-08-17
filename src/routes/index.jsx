import { createBrowserRouter } from "react-router-dom";
import { PublicShell } from "@/components/layout/PublicShell";
import { HomePage } from "@/pages/public/HomePage";
import { PlaceholderPage } from "@/pages/public/PlaceholderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicShell />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: (
          <PlaceholderPage
            title="About Greenwood / Al-Hadi"
            description="Discover our mission, history, academic leadership, and faculty."
          />
        ),
      },
      {
        path: "academics",
        element: (
          <PlaceholderPage
            title="Academic Programs & Curriculum"
            description="Comprehensive guide to Primary, Middle, Secondary, and STEM wings."
          />
        ),
      },
      {
        path: "facilities",
        element: (
          <PlaceholderPage
            title="Campus Facilities"
            description="Explore our science & robotics laboratories, sports arena, library, and arts studios."
          />
        ),
      },
      {
        path: "activities",
        element: (
          <PlaceholderPage
            title="Life Skills & Activities (LSA)"
            description="Co-curricular athletics, robotics club, arts, debate, and leadership programs."
          />
        ),
      },
      {
        path: "memories",
        element: (
          <PlaceholderPage
            title="Photo Gallery & Memories"
            description="Visual archives of sports galas, annual exhibitions, and student achievements."
          />
        ),
      },
      {
        path: "notices",
        element: (
          <PlaceholderPage
            title="Notice Board & Circulars"
            description="Official announcements, date sheets, exam schedules, and circulars."
          />
        ),
      },
      {
        path: "admissions",
        element: (
          <PlaceholderPage
            title="Admissions 2026–2027"
            description="Online admission applications, eligibility requirements, and fee schedules."
          />
        ),
      },
      {
        path: "admissions/status",
        element: (
          <PlaceholderPage
            title="Application Status Tracker"
            description="Track the real-time review status of your admission application."
          />
        ),
      },
      {
        path: "results",
        element: (
          <PlaceholderPage
            title="Examination Results Portal"
            description="Official published session results with instant roll-number search."
          />
        ),
      },
      {
        path: "contact",
        element: (
          <PlaceholderPage
            title="Contact & Admissions Office"
            description="Get in touch with administration, admissions counseling, or book a campus tour."
          />
        ),
      },
      {
        path: "login",
        element: (
          <PlaceholderPage
            title="Staff Authentication Portal"
            description="Secure dashboard sign-in for Administrators and Class Teachers."
            badge="Staff Login"
          />
        ),
      },
      {
        path: "*",
        element: (
          <PlaceholderPage
            title="Page Not Found"
            description="The page you requested does not exist or has been moved."
            badge="404 Not Found"
          />
        ),
      },
    ],
  },
]);
