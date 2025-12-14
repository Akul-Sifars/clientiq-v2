/**
 * FILE OVERVIEW:
 *   Purpose: Application entry point with TanStack Router
 *   Key Concepts: React, TanStack Router, StrictMode
 *   Module Type: Entry Point
 *   @ai_context: Bootstraps the React app with routing
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./index.css";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
