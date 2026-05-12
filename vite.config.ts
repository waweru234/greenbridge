import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import { createRequire } from "node:module";
// prerender plugin removed due to vulnerable transitive dependencies (html-minifier / puppeteer)

const PRERENDER_ROUTES = ["/", "/about", "/services", "/projects", "/contact"];

// SPA build: TanStack Router (file-based) + Tailwind v4.
// Output → dist/, suitable for Vercel static hosting with a SPA fallback.
export default defineConfig({
  base: "/",
  plugins: [
    tsconfigPaths(),
    // NOTE: @tanstack/router-plugin removed from plugins to avoid install-time 404 on vercel.
    // If you need automatic file-based route generation again, re-add TanStackRouterVite and ensure the package resolves.
    tailwindcss(),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  server: {
    host: "::",
    port: 8080,
  },
});
