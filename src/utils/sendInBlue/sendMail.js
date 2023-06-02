/* eslint-disable no-console */
/* eslint-disable consistent-return */
import axios from "axios";

export const sendBrevoMail = async (name, email, subject, templateId) => {
  try {
    const request = await axios
      .post("/api/sendInBlue/sendEmail", {
        name,
        email,
        templateId,
        subject,
      })
      .then((res) => {
        return res;
      });
    return request.status === 200;
  } catch (err) {
    console.error(err);
  }
};
