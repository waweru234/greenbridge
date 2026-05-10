import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const vitePrerenderModule = require("vite-plugin-prerender");
const vitePrerender = vitePrerenderModule.default ?? vitePrerenderModule;

const PRERENDER_ROUTES = ["/", "/about", "/services", "/projects", "/contact"];

// SPA build: TanStack Router (file-based) + Tailwind v4.
// Output → dist/, suitable for Vercel static hosting with a SPA fallback.
export default defineConfig({
  base: "/",
  plugins: [
    tsconfigPaths(),
    TanStackRouterVite({
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
      autoCodeSplitting: true,
    }),
    tailwindcss(),
    react(),
    vitePrerender({
      staticDir: path.join(__dirname, "dist"),
      routes: PRERENDER_ROUTES,
      renderer: new vitePrerender.PuppeteerRenderer({
        renderAfterTime: 1500,
        maxConcurrentRoutes: 4,
        skipThirdPartyRequests: true,
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      }),
    }),
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
