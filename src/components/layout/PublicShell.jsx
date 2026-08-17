import { Outlet } from "react-router-dom";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { PublicFooter } from "@/components/layout/PublicFooter";

export function PublicShell() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-primary-light selection:text-primary">
      <PublicNavbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
