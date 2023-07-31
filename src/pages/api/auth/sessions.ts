/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "./axios";

const LOGIN_URL = "/oauth/token";
const SIGNUP_URL = "/users";
const UPDATE_PROFILE_URL = "/users";
const LOGOUT_URL = "/oauth/revoke";
const CURRENT_USER_URL = "/users/me";
const DIVE_SITE_INDEX_URL = "/dive_sites";

// Check if I should remove the NEXT_PUBLIC
const CLIENT_ID = process.env.NEXT_PUBLIC_SERVER_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SERVER_CLIENT_SECRET;

export async function createUserWithEmailAndPassword(
  email: string,
  password: string
) {
  const data = {
    email,
    password,
    client_id: CLIENT_ID,
  };

  return axios
    .post(SIGNUP_URL, data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}

export async function loginWithEmailAndPassword(
  email: string,
  password: string
) {
  const data = {
    grant_type: "password",
    email,
    password,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };
  // console.log("login data server", data);

  return axios
    .post(LOGIN_URL, data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}

export async function updateUserProfile(
  currentPassword: string,
  token: string | undefined,
  email?: string,
  password?: string
) {
  const data = {
    current_password: currentPassword,
    email,
    password,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return axios
    .patch(UPDATE_PROFILE_URL, data, config)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}

export async function logoutUserWithToken(token: string) {
  const data = {
    token,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  return axios
    .post(LOGOUT_URL, data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}

export async function requestAccessTokenWithRefreshToken(refreshToken: string) {
  const data = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  return axios
    .post(LOGIN_URL, data)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}

export async function getCurrentUser(accessToken: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios
    .get(CURRENT_USER_URL, config)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}

export async function getDiveSites(accessToken: string) {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return axios
    .get(DIVE_SITE_INDEX_URL, config)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      return error.response.data;
    });
}
