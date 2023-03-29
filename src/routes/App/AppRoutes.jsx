import React, { Suspense } from "react";
import { useRoutes, Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import pages from "./appPage";
import { LayoutApp } from "../../layouts/layoutApp";

const UserRole = {
  SuperAdmin: "SuperAdmin",
  Admin: "Admin",
  SpecialUser: "Special User",
  VIPUser: "VIP User",
  User: "User",
};

const { Page1, Page2, Page3, Page4, Page5 } = pages;

const routes = [
  {
    path: "/dashboard",
    element: <Outlet />,
    children: [
      { path: "superadmin", element: <Page3 /> },
      { path: "admin", element: <Page4 /> },
      { path: "specialuser", element: <Page1 /> },
      { path: "vipuser", element: <Page5 /> },
    ],
  },
  { path: "/intro", element: <Page2 /> },
  { path: "/admin", element: <Page4 /> },
];

const authorizedRoutes = {
  [UserRole.SuperAdmin]: [routes[0]],
  [UserRole.Admin]: [routes[0], routes[2]],
  [UserRole.SpecialUser]: [routes[0]],
  [UserRole.VIPUser]: [routes[0]],
  [UserRole.User]: [routes[0]],
};

const unauthorizedRoutes = [routes[1]];

const AppRoutes = ({ userRole }) => {
  const authorizedRoutesForUserRole = authorizedRoutes[userRole] || [];
  const authorizedRouteConfigs = authorizedRoutesForUserRole.map((route) => {
    const children = route.children || [];
    return {
      path: route.path,
      element: route.element,
      children: children.map((childRoute) => ({
        path: childRoute.path,
        element: childRoute.element,
      })),
    };
  });

  const routingConfig = useRoutes([
    ...unauthorizedRoutes.map((route) => ({
      path: route.path,
      element: route.element,
    })),
    ...authorizedRouteConfigs,
    { path: "*", element: <Navigate to="/intro" replace /> },
  ]);

  return <LayoutApp>
    <Suspense fallback={<div>Loading...</div>}>{routingConfig}</Suspense>
  </LayoutApp>;
};

AppRoutes.propTypes = {
  userRole: PropTypes.oneOf(Object.values(UserRole)),
};

export default AppRoutes;
