/* eslint-disable import/no-unresolved */
const Moralis = require("moralis/node");

export default async function getDiveSites() {
  const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
  const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
  const masterKey = process.env.MORALIS_MASTER_KEY;

  Moralis.start({ serverUrl, appId, masterKey });
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
    data = err.message;
  }
  return { data };
  // res.status(status).json({ data });
}
