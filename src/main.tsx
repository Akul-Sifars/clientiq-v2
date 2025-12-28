/**
 * FILE OVERVIEW:
 *   Purpose: Application entry point with TanStack Router and PWA support
 *   Key Concepts: React, TanStack Router, StrictMode, Service Worker
 *   Module Type: Entry Point
 *   @ai_context: Bootstraps the React app with routing and registers service worker
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { registerSW } from "./lib/pwa";
import "./index.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

if (import.meta.env.PROD) {
  registerSW();
} else if (import.meta.env.DEV) {
  registerSW();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
