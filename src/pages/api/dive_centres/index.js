const Moralis = require("moralis-v1/node");

const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;

Moralis.start({ serverUrl, appId });

export default async function handler(req, res) {
  let status = 200;
  let data = null;

  try {
    const Centres = Moralis.Object.extend("DiveCentres");
    const query = new Moralis.Query(Centres);
    query.select(
      "objectId",
      "name",
      "address",
      "description",
      "latitude",
      "longitude",
      "photo",
      "city",
      "languages",
      "memberships",
      "services",
      "equipment",
      "paymentMethods",
      "country"
    );
    const results = await query.find();

    if (results.length > 0) {
      const DiveCentres = results;
      data = DiveCentres;
    }
  } catch (err) {
    status = 500;
    data = err.message;
  }

  res.status(status).json({ data });
}
