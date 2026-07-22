import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// When served from a subfolder (e.g. GitHub Pages project sites), Vite's base is
// injected here so client routing matches the deployed path. Defaults to "/".
const viteBase = import.meta.env.BASE_URL || "/";
const basepath = viteBase === "/" ? undefined : viteBase.replace(/\/$/, "");

export const getRouter = () => {
  return createRouter({
    routeTree,
    basepath,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });
};
