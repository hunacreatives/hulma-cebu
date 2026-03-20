// src/routes/index.tsx   (rename the file from .ts to .tsx)

import React from "react";
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ProjectDetail from "../pages/project/page";
import CategoryPage from "../pages/category/page";
import AboutPage from "../pages/about/page";
import InspirationPage from "../pages/inspiration/page";
import ContactPage from "../pages/contact/page";
import BookPresentationPage from "../pages/book-presentation/page";
import RequestSamplesPage from "../pages/request-samples/page";
import BlogPage from "../pages/blog/page";
import BlogDetailPage from "../pages/blog/[slug]/page";
import ComingSoonPage from "../pages/coming-soon/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/coming-soon",
    element: <ComingSoonPage />,
  },
  {
    path: "/products/:type/:slug",
    element: <ComingSoonPage />,
  },
  {
    path: "/products/:type",
    element: <ComingSoonPage />,
  },
  {
    path: "/category",
    element: <ComingSoonPage />,
  },
  {
    path: "/project/:slug",
    element: <ProjectDetail />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/projects",
    element: <InspirationPage />,
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/blog/:slug",
    element: <BlogDetailPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/book-presentation",
    element: <BookPresentationPage />,
  },
  {
    path: "/request-samples",
    element: <RequestSamplesPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
