/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";

import type { RootState } from "./store";

function PublicOnlyRoute({ children }: any) {
  const router = useRouter();
  const accessToken = useSelector(
    (state: RootState) => state.session.accessToken
  );
  const loading = useSelector((state: RootState) => state.session.loading);
  // const location = useLocation();
  // const fromLocation = (location.state as any)?.from;
  // const previousLocation = fromLocation || { pathname: "/" };

  if (!accessToken && !loading) {
    return children;
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (accessToken && !loading) {
    return router.back();
    // <Navigate to={previousLocation} state={{ from: location }} replace />
  }
  return <p>Something went wrong</p>;
}

export default PublicOnlyRoute;
