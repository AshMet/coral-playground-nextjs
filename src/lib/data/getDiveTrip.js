import { useMoralisQuery } from "react-moralis";

export default async function getDiveSites() {
  const { data: siteData } = useMoralisQuery("DiveTrips", (query) =>
    query.include("diveCentre")
  );

  try {
    const data = [];
    // let trips = await tripsQuery.find();
    for (const trip of siteData) {
      // This query is done by creating a relation and querying it
      const tripSitesRelation = trip.relation("diveSites");
      const siteList = await tripSitesRelation.query().find();

      data.push({
        id: trip.id,
        diver_cert: trip.attributes.diverCert,
        price: trip.attributes.price,
        notes: trip.attributes.notes,
        start_time: trip.attributes.startTime,
        end_time: trip.attributes.endTime,
        dive_centre: trip.attributes.diveCentre.attributes.name,
        dive_sites: siteList.map((site) => site.attributes.name),
        stripe_price_id: "price_1LBLSVAvLPvC9h7xk0HEvL3f",
      });
    }
    return { data };
    console.log("Moralis Trip relations", data);
  } catch (error) {
    console.error("Error!", error);
    return false;
  }
}
