import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

// Static (prerendered) build for GitHub Pages is opt-in via env, so the default
// build stays a normal SSR app (for the production host). PAGES_BASE handles the
// project-pages subfolder (e.g. "/vibrant-care-fitness/").
const isPagesBuild = process.env.PAGES_BUILD === "true";
const base = process.env.PAGES_BASE || "/";

export default defineConfig({
  base,
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      // Route SSR through src/server.ts, our resilient error-handling entry.
      server: { entry: "server" },
      ...(isPagesBuild
        ? { prerender: { enabled: true, crawlLinks: true, failOnError: false } }
        : {}),
    }),
    viteReact(),
  ],
});
