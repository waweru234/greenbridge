import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouterState } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient-bridge">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-bridge text-white px-5 py-2.5 text-sm font-semibold shadow-sun"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Greenbridge Energy — Bridging Clean Energy between the UK & Africa" },
      {
        name: "description",
        content:
          "Greenbridge Energy delivers solar, wind and grid solutions across the UK and Africa. Sustainable power, real-world impact.",
      },
      { name: "author", content: "Greenbridge Energy Limited" },
      { property: "og:title", content: "Greenbridge Energy — Bridging Clean Energy between the UK & Africa" },
      { property: "og:description", content: "A full-stack web application for a renewable energy company, featuring a public website and an admin dashboard for content management." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Greenbridge Energy — Bridging Clean Energy between the UK & Africa" },
      { name: "description", content: "A full-stack web application for a renewable energy company, featuring a public website and an admin dashboard for content management." },
      { name: "twitter:description", content: "A full-stack web application for a renewable energy company, featuring a public website and an admin dashboard for content management." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/EjPnjq2fCrc6tzmcwjrl6UKTP7o1/social-images/social-1777011379492-Untitled_design_(14).webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/EjPnjq2fCrc6tzmcwjrl6UKTP7o1/social-images/social-1777011379492-Untitled_design_(14).webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { location } = useRouterState();
  const isAdmin = location.pathname.startsWith("/admin") || location.pathname === "/auth";

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {!isAdmin && <SiteHeader />}
        <main className={`flex-1 ${isAdmin ? "" : "pt-20"}`}>
          <Outlet />
        </main>
        {!isAdmin && <SiteFooter />}
        {!isAdmin && <WhatsAppButton />}
        <Toaster richColors position="top-right" />
      </div>
    </AuthProvider>
  );
}
