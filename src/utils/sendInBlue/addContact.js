/* eslint-disable no-console */
/* eslint-disable consistent-return */
import axios from "axios";

export const addBrevoContact = async (
  firstName,
  lastName,
  email,
  role
  // businessName
) => {
  try {
    const request = await axios
      .post("/api/sendInBlue/createContact", {
        email,
        firstName,
        lastName,
        role,
        // businessName,
      })
      .then((res) => {
        return res;
      });
    return request.status === 200;
  } catch (err) {
    console.error(err);
  }
};
