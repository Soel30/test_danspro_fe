import React from "react";
import ReactDOM from "react-dom/client";
import App from "./page/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import JobDetail from "./page/job/detail";
import JobLists from "./page/job";
import { ProtectedRoute } from "./components/common/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/jobs",
    element: (
      <ProtectedRoute>
        <JobLists />
      </ProtectedRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <JobDetail />
      </ProtectedRoute>
    ),
    path: "/jobs/:id",
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
