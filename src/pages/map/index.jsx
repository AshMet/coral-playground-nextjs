/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-cycle */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { NextSeo } from "next-seo";

// Assets
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
      {/* <Flex
        gridArea="1 / 1 / 1 / 1"
        display={{ base: "block", lg: "flex" }}
        pt="80px"
      > */}
      <MapBase
        diveSites={diveSites}
        diveCentres={diveCentres}
        h={{ sm: "calc(100vh - 110px)", md: "calc(100vh - 90px)" }}
        pt={{ sm: "40px", lg: "60px" }}
        gridArea="1 / 1 / 1 / 1"
      />
      {/* </Flex> */}
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
