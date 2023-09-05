/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */

import { NextSeo } from "next-seo";

import { supabase } from "../api";
import MapBase from "components/maps/MapBase";
import DivingLayout from "layouts/DivingLayout";

export default function Default({ diveSites, diveCentres }) {
  return (
    <>
      <NextSeo
        title="Scuba Diving Map"
        description="Explore dive sites and centres on our interactive map"
        openGraph={{
          type: "website",
          title: "Coral Playground | Scuba Diving Map",
          description: "Explore dive sites and centres on our interactive map",
          url: "https://www.coralplayground.com/map/",
          images: [
            {
              url: "https://www.coralplayground.com/img/diving/dive_site_bg.jpg",
              width: 800,
              height: 600,
              alt: "Dive Sites Cover Photo",
            },
          ],
        }}
      />
      <MapBase
        diveSites={diveSites}
        diveCentres={diveCentres}
        h={{ sm: "calc(100vh - 110px)", md: "calc(100vh - 90px)" }}
        pt={{ sm: "40px", lg: "60px" }}
        gridArea="1 / 1 / 1 / 1"
        scrollZoom
      />
    </>
  );
}

export async function getStaticProps() {
  const { data: diveSites } = await supabase
    .from("dive_sites_view")
    .select(`id, name, latitude, longitude, diveMap`);
  const { data: diveCentres } = await supabase
    .from("active_dive_centres_view")
    .select(`id, name, latitude, longitude, coverPhotoUrl`);
  return { props: { diveSites, diveCentres }, revalidate: 86400 };
}

Default.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
