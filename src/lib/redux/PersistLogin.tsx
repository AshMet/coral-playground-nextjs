/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Outlet } from "react-router-dom";

import { refreshAccessToken } from "./sessionSlice";
import type { RootState } from "./store";

function PersistLogin({ children }) {
  const loading = useSelector((state: RootState) => state.session.loading);
  const accessToken = useSelector(
    (state: RootState) => state.session.accessToken
  );
  const refreshToken = useSelector(
    (state: RootState) => state.session.refreshToken
  );
  const dispatch = useDispatch();

  useEffect(() => {
    function verifyRefreshToken() {
      try {
        dispatch(refreshAccessToken(refreshToken));
      } catch (error) {
        console.log(error);
      }
    }
    if (!accessToken) {
      verifyRefreshToken();
    }
  }, [accessToken, refreshToken]);

  return <>{loading ? <p>Loading...</p> : { children }}</>;
}

export default PersistLogin;
