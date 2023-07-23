/* eslint-disable import/no-cycle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Box } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import {} from "react-icons/io";

import Card from "components/card/Card";
import CentreCard from "components/pages/diveCentreManage/CentreCard";
import CentreTrips from "components/pages/diveCentreManage/CentreTrips";
import NoCentreCard from "components/pages/diveCentreManage/NoCentreCard";
import DivingLayout from "layouts/DivingLayout";

export default function Profile(props) {
  const { centreData, diveTrips } = props;
  const [diveCentre, setDiveCentre] = useState(centreData);

  useEffect(() => {
    if (!centreData) return null;
    setDiveCentre(centreData);
  }, [centreData]);

  return (
    <Box>
      <>
        <NextSeo noindex nofollow />
        <Box pt={{ sm: "60px", xl: "100px" }}>
          <Card p={{ base: "15px", md: "30px" }}>
            {diveCentre.length === 0 ? (
              <NoCentreCard />
            ) : (
              <CentreCard diveCentre={diveCentre} />
            )}
          </Card>
          {diveCentre.length !== 0 && (
            <CentreTrips diveCentre={diveCentre} diveTrips={diveTrips} />
          )}
        </Box>
      </>
    </Box>
  );
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;

  console.log("session:", session);

  const { data: diveCentre } = await supabase
    .from("dive_centres_view")
    .select(
      `id, name, description, address, latitude, longitude, paymentMethods, equipment, services, languages, memberships,
      coverPhotoUrl, city, country, slug, ownerId, active`
    )
    .eq("ownerId", userId)
    .single();

  console.log("userId: ", userId);
  console.log("dive_centre: ", diveCentre);

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
  const { data: diveTrips } = await supabase
    .from("dive_trips")
    .select(
      `id, name, description, notes, min_cert, status, price, pay_now,
          stripe_price_id, start_date, start_time, check_in, created_at, updated_at,
          dive_sites:trip_sites!dive_trip_id(
            dive_site:dive_site_id(id, name, latitude, longitude))
      `
    )
    .eq("dive_centre_id", diveCentre.id);
  // .order("updated_at", { ascending: true });

  return {
    props: {
      session,
      user: session.user,
      centreData: diveCentre ?? [],
      diveTrips,
    },
  };
};

Profile.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
