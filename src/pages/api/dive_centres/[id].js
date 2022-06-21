const Moralis = require("moralis/node");

const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;

Moralis.start({ serverUrl, appId });

export default async function handler(req, res) {
  let status = 200;
  let data = null;
  const { id } = req.query;

  try {
    const DiveCentres = Moralis.Object.extend("DiveCentres");
    const query = new Moralis.Query(DiveCentres);
    query
      .equalTo("objectId", id) // change back to "id"
      .select(
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

    if (results.length === 1) {
      const DiveCentre = results[0];
      data = DiveCentre;
    }
  } catch (err) {
    status = 500;
    data = err.message;
  }

  res.status(status).json({ data });
}
