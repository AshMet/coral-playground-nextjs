/* eslint-disable react/prop-types */

import { Box } from "@chakra-ui/react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextSeo } from "next-seo";
import {} from "react-icons/io";

import Card from "components/card/Card";
import CentreCard from "components/pages/diveCentreManage/CentreCard";
import CentreTrips from "components/pages/diveCentreManage/CentreTrips";
import NoCentreCard from "components/pages/diveCentreManage/NoCentreCard";
import DivingLayout from "layouts/DivingLayout";

export default function Manage(props) {
  const { diveCentre, diveTrips, centreEquipment, equipment, certs } = props;
  // console.log("manage centre", diveCentre);
  // console.log("manage", diveTrips);

  return (
    <Box>
      <>
        <NextSeo noindex nofollow />
        <Card p={{ base: "15px", md: "30px" }}>
          {diveCentre ? (
            <CentreCard
              diveCentre={diveCentre}
              equipment={equipment}
              certs={certs}
            />
          ) : (
            <NoCentreCard />
          )}
        </Card>
        {diveCentre && (
          <CentreTrips
            diveCentre={diveCentre}
            diveTrips={diveTrips}
            centreEquipment={centreEquipment}
          />
        )}
      </>
    </Box>
  );
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;

  // console.log("session:", session);

  const { data: diveCentre } = await supabase
    .from("dive_centres_view")
    .select(
      `id, name, description, address, latitude, longitude, paymentMethods, equipment, services, languages, memberships,
      coverPhotoUrl, city, country, slug, ownerId, active`
    )
    .eq("ownerId", userId)
    .limit(1)
    .single();

  // console.log("userId: ", userId);
  // console.log("dive_centre: ", diveCentre[0]);

  // debugger;

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  if (diveCentre?.ownerId !== userId || diveCentre?.ownerId === null) {
    return {
      props: {
        session,
        user: session.user,
        centreData: [],
      },
    };
  }

  // Get dive trips with the current dive centre
  // const { data: diveTrips } = await supabase
  //   .from("dive_trips")
  //   .select(
  //     `id, name, description, min_cert, active, price, deposit, stripe_price_id,
  //         start_date, start_time, checkin, frequency, recur_days, recur_end_date,
  //         duration, generic, timezone, dive_count, created_at, updated_at,
  //         dive_sites:trip_sites!dive_trip_id(
  //           dive_site:dive_site_id(id, name, latitude, longitude))
  //     `
  //   )
  //   .eq("dive_centre_id", diveCentre?.id);
  // // .order("updated_at", { ascending: true });

  // Get dive trips with the current dive centre
  const { data: diveTrips } = await supabase
    .from("dive_trips_view")
    .select("*")
    .eq("diveCentreId", diveCentre.id)
    .order("startDate", { ascending: true });

  const { data: equipment } = await supabase.from("equipment").select("*");
  const { data: certs } = await supabase.from("certifications").select("*");

  const { data: centreEquipment } = await supabase
    .from("centre_equipment_view")
    .select("*")
    .eq("centreId", diveCentre.id);
  // console.log("diveTrips: ", diveTrips);
  return {
    props: {
      session,
      user: session.user,
      diveCentre,
      diveTrips,
      equipment,
      certs,
      centreEquipment,
    },
  };
};

Manage.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
