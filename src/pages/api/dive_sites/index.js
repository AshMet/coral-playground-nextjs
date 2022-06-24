const Moralis = require("moralis/node");

const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;

Moralis.start({ serverUrl, appId });

export async function getDiveSites() {
  let status = 200;
  let data = null;

  try {
    const DiveSite = Moralis.Object.extend("DiveSites");
    const query = new Moralis.Query(DiveSite);
    query.select(
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

    if (results.length > 0) {
      const diveSites = results;
      data = diveSites;
    }
  } catch (err) {
    status = 500;
    data = err.message;
  }
  return { data, status };
}

export default async function handler(req, res) {
  const { data, status } = await getDiveSites();
  res.status(status).json({ data });
}
