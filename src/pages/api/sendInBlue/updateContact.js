/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
const SibApiV3Sdk = require("sib-api-v3-sdk");

const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

export default async function handler(req, res) {
  const apiInstance = new SibApiV3Sdk.ContactsApi();
  const identifier = req?.body?.email;

  const updateContact = new SibApiV3Sdk.UpdateContact();
  // const userType = req?.body?.role || "";
  updateContact.attributes = {
    FIRSTNAME: req?.body?.firstName,
    LASTNAME: req?.body?.lastName,
    USERTYPE: req?.body?.role === "business" ? "Business" : "Diver",
    // USERTYPE: userType.charAt(0).toUpperCase() + userType.slice(1),
    BUSINESSNAME: req?.body?.businessName,
  };
  updateContact.listIds = req?.body?.listIds;

  if (req.method === "POST") {
    try {
      const customer = await apiInstance.updateContact(
        identifier,
        updateContact
      );
      res.status(200).json(customer);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
