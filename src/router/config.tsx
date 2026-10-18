import { lazy, Suspense, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ProjectDetail from "../pages/project/page";
import AboutPage from "../pages/about/page";
import InspirationPage from "../pages/inspiration/page";
import ContactPage from "../pages/contact/page";
import BookPresentationPage from "../pages/book-presentation/page";
import RequestSamplesPage from "../pages/request-samples/page";
import BlogPage from "../pages/blog/page";
import BlogDetailPage from "../pages/blog/[slug]/page";
import ComingSoonPage from "../pages/coming-soon/page";
import { AdminGate } from "../pages/admin/auth";

// The website admin (hulmacebu.com/admin) loads on demand, so visitors never download it.
const AdminLogin = lazy(() => import("../pages/admin/login/page"));
const ProjectsAdmin = lazy(() => import("../pages/admin/projects/page"));
const ProjectEditor = lazy(() => import("../pages/admin/projects/edit"));
const EnquiriesAdmin = lazy(() => import("../pages/admin/enquiries/page"));
const SettingsAdmin = lazy(() => import("../pages/admin/settings/page"));

const adminLoading = (
  <div className="flex h-screen items-center justify-center bg-white">
    <i className="ri-loader-4-line animate-spin text-2xl text-gray-300" />
  </div>
);
const page = (el: ReactNode) => <Suspense fallback={adminLoading}>{el}</Suspense>;
const admin = (el: ReactNode) => page(<AdminGate>{el}</AdminGate>);

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
  { path: "/admin/login", element: page(<AdminLogin />) },
  { path: "/admin", element: admin(<Navigate to="/admin/projects" replace />) },
  { path: "/admin/projects", element: admin(<ProjectsAdmin />) },
  { path: "/admin/projects/:id", element: admin(<ProjectEditor />) },
  { path: "/admin/enquiries", element: admin(<EnquiriesAdmin />) },
  { path: "/admin/settings", element: admin(<SettingsAdmin />) },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
