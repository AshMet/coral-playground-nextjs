/* eslint-disable consistent-return */
// import { createClient } from "@supabase/supabase-js";
import { supabase } from "../index";

export default async function handler(req, res) {
  // Create a single supabase client for interacting with your database
  // const supabase = createClient(
  //   `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
  //   `${process.env.SUPABASE_SERVICE_KEY}`
  // );

  if (req.method === "PATCH") {
    const diveSite = req.body;
    const { id } = req.query;

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
      min_depth: diveSite.min_depth,
      max_depth: diveSite.max_depth,
      min_current: diveSite.min_current,
      max_current: diveSite.max_current,
      access: diveSite.access,
      cert_level: diveSite.cert_level,
      tags: diveSite.tags,
      dive_map: diveSite.dive_map,
      city_id: city.id,
    };
    const { data: updatedSite, error } = await supabase
      .from("dive_sites")
      .update(siteColumns)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      res.status(401).json({ error: error.message });
    } else if (updatedSite && diveSite.species && diveSite.species.length > 0) {
      const { data: species } = await supabase
        .from("species")
        .select("id")
        .in("name", diveSite.species);
      // Get ids from species
      const speciesIds = species?.map((item) => item.id);
      // map speciesId into an array of objects
      const speciesValues = speciesIds?.map((sid) => ({
        dive_site_id: updatedSite.id,
        species_id: sid,
      }));

      // Create bulk create on site_species from species ids
      if (speciesValues.length > 0) {
        const { data: siteSpecies } = await supabase
          .from("site_species")
          .insert(speciesValues)
          .select();
        res.status(200).json({ updatedSite, siteSpecies });
      }
    }
    res.status(200).json({ updatedSite });
  }
}
