import { createBrowserRouter } from "react-router-dom";
import { PublicShell } from "@/components/layout/PublicShell";
import { HomePage } from "@/pages/public/HomePage";
import { AboutPage } from "@/pages/public/AboutPage";
import { AcademicsPage } from "@/pages/public/AcademicsPage";
import { FacilitiesPage } from "@/pages/public/FacilitiesPage";
import { ActivitiesPage } from "@/pages/public/ActivitiesPage";
import { MemoriesPage } from "@/pages/public/MemoriesPage";
import { NoticesPage } from "@/pages/public/NoticesPage";
import { BlogsPage } from "@/pages/public/BlogsPage";
import { BlogDetailPage } from "@/pages/public/BlogDetailPage";
import { AdmissionsPage } from "@/pages/public/AdmissionsPage";
import { ContactPage } from "@/pages/public/ContactPage";
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
        element: <AboutPage />,
      },
      {
        path: "academics",
        element: <AcademicsPage />,
      },
      {
        path: "facilities",
        element: <FacilitiesPage />,
      },
      {
        path: "activities",
        element: <ActivitiesPage />,
      },
      {
        path: "memories",
        element: <MemoriesPage />,
      },
      {
        path: "notices",
        element: <NoticesPage />,
      },
      {
        path: "blogs",
        element: <BlogsPage />,
      },
      {
        path: "blogs/:slug",
        element: <BlogDetailPage />,
      },
      {
        path: "admissions",
        element: <AdmissionsPage />,
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
        element: <ContactPage />,
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
