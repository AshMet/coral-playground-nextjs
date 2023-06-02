/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable func-names */
const SibApiV3Sdk = require("sib-api-v3-sdk");

const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

export default async function handler(req, res) {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  // sendSmtpEmail.subject = "My {{params.subject}  }";
  sendSmtpEmail.templateId = req?.body?.templateId;
  // sendSmtpEmail.htmlContent = "<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
  // sendSmtpEmail.sender = {"name":"John Doe","email":"example@example.com"};
  sendSmtpEmail.to = [{ email: req?.body?.email, name: req?.body?.first_name }];
  // sendSmtpEmail.cc = [{"email":"example2@example2.com","name":"Janice Doe"}];
  // sendSmtpEmail.bcc = [{"email":"John Doe","name":"example@example.com"}];
  sendSmtpEmail.replyTo = {
    email: "info@coralplayground.com",
    name: "Coral Playground",
  };
  // sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
  // sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};

  if (req.method === "POST") {
    try {
      const welcomeEmail = await apiInstance.sendTransacEmail(sendSmtpEmail);
      res.status(200).json(welcomeEmail);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
