import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// When served from a subfolder (e.g. GitHub Pages project sites), Vite's base is
// injected here so client routing matches the deployed path. Defaults to "/".
const viteBase = import.meta.env.BASE_URL || "/";
const basepath = viteBase === "/" ? undefined : viteBase.replace(/\/$/, "");

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    basepath,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
