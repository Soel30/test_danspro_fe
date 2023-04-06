import { Navigate, Route, useLocation } from "react-router-dom";
import React from "react";
import { useCookies } from "react-cookie";

interface IProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<IProtectedRouteProps> = ({
  children,
}) => {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  // get current route
  const { pathname } = useLocation();

  // if (!cookies.access_token) {
  //   return <Navigate to="/" />;
  // }

  if (pathname === "/" && cookies.access_token) {
    return <Navigate to="/jobs" />;
  } else if (pathname !== "/" && !cookies.access_token) {
    return <Navigate to="/" />;
  } 

  return <>{children}</>;
};
