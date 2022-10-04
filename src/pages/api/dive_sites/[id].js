const Moralis = require("moralis-v1/node");

const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;

Moralis.start({ serverUrl, appId });

export default async function handler(req, res) {
  let status = 200;
  let data = null;
  const { id } = req.query;

  try {
    const DiveSites = Moralis.Object.extend("DiveSites");
    const query = new Moralis.Query(DiveSites);
    query
      .equalTo("objectId", id) // change back to "id"
      .select(
        "objectId",
        "name",
        "maxDepth",
        "description",
        "latitude",
        "longitude",
        "diveMap",
        "city",
        "access",
        "certLevel",
        "divingTypes",
        "country",
        "rating",
        "species"
      );
    const results = await query.find();

    if (results.length === 1) {
      const DiveSite = results[0];
      data = DiveSite;
    }
  } catch (err) {
    status = 500;
    data = err.message;
  }

  res.status(status).json({ data });
}
