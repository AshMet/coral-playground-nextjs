/* eslint-disable consistent-return */
// const Moralis = require("moralis-v1/node");

// const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
// const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;

// Moralis.start({ serverUrl, appId });

// export async function getDiveSites() {
//   let status = 200;
//   let data = null;

//   try {
//     const DiveSite = Moralis.Object.extend("DiveSites");
//     const query = new Moralis.Query(DiveSite);
//     query.select(
//       "objectId",
//       "name",
//       "maxDepth",
//       "description",
//       "latitude",
//       "longitude",
//       "diveMap",
//       "city",
//       "access",
//       "certLevel",
//       "divingTypes",
//       "country",
//       "rating",
//       "species"
//     );
//     const results = await query.find();

//     if (results.length > 0) {
//       const diveSites = results;
//       data = diveSites;
//     }
//   } catch (err) {
//     status = 500;
//     data = err.message;
//   }
//   return { data, status };
// }

// export default async function handler(req, res) {
//   const { data, status } = await getDiveSites();
//   res.status(status).json({ data });
// }

// import { createClient } from "@supabase/supabase-js";
import { supabase } from "../index";

export default async function handler(req, res) {
  // const supabase = createClient(
  //   `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
  //   `${process.env.SUPABASE_SERVICE_KEY}`
  // );
  if (req.method === "GET") {
    const { data, error } = await supabase.from("dive_sites_view").select("*");
    if (error) {
      return res.status(400).json({ error: "Could not retrieve dive sites" });
    }
    if (data) {
      res.status(200).json({ data });
    }
  } else if (req.method === "POST") {
    const diveSite = req.body;

    const { data: city, error: wrongCity } = await supabase
      .from("cities")
      .select("id")
      .eq("name", diveSite.city)
      .single();

    if (wrongCity) {
      return res.status(400).json({ error: "Wrong city name" });
    }

    const siteColumns = {
      name: diveSite.name,
      latitude: diveSite.latitude,
      longitude: diveSite.longitude,
      min_visibility: diveSite.min_visibility,
      max_visibility: diveSite.max_visibility,
      depth: diveSite.depth,
      current: diveSite.current,
      access: diveSite.access,
      cert_level: diveSite.cert_level,
      tags: diveSite.tags,
      dive_map: diveSite.dive_map,
      city_id: city.id,
    };

    // Create Dive Site in supabase
    const { data: newSite, error: newSiteError } = await supabase
      .from("dive_sites")
      .insert(siteColumns)
      .select();

    if (newSiteError) {
      res.status(400).json({ error: newSiteError.message });
    } else if (newSite && diveSite.species && diveSite.species.length > 0) {
      const { data: species } = await supabase
        .from("species")
        .select("id")
        .in("name", diveSite.species);
      // Get ids from species
      const speciesIds = species.map((item) => item.id);
      // map speciesId into an array of objects
      const speciesValues = speciesIds.map((sid) => ({
        dive_site_id: newSite.id,
        species_id: sid,
      }));

      // Create bulk create on site_species from species ids
      if (speciesValues.length > 0) {
        const { data: siteSpecies } = await supabase
          .from("site_species")
          .insert(speciesValues)
          .select();
        res.status(200).json({ newSite, siteSpecies });
      }
    }
    res.status(200).json({ data: newSite });
  }
}
