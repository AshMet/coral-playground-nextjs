/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
const SibApiV3Sdk = require("sib-api-v3-sdk");

const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

export default async function handler(req, res) {
  const apiInstance = new SibApiV3Sdk.ContactsApi();
  const newContact = new SibApiV3Sdk.CreateContact();

  newContact.email = req?.body?.email;
  newContact.attributes = {
    FNAME: req?.body?.firstName,
    LNAME: req?.body?.lastName,
    BUSNESSNAME: req?.body?.role,
  };
  newContact.listIds = [5];

  if (req.method === "POST") {
    try {
      const customer = await apiInstance.createContact(newContact);
      res.status(200).json(customer);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
