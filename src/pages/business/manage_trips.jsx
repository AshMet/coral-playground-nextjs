/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Flex } from "@chakra-ui/react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextSeo } from "next-seo";

import Card from "components/card/Card";
import SearchTableDiveTrips from "components/pages/admin/dive_trips/SearchTableDiveTrips";
import EventCalendar from "components/pages/diveCentreManage/EventCalendar";
import DivingLayout from "layouts/DivingLayout";
import { getCalendarDives } from "utils/helpers/diveCentresHelper";

const columnsDataTrips = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "DESC",
    accessor: "description",
  },
  {
    Header: "DIVES",
    accessor: "diveCount",
  },
  {
    Header: "START DATE",
    accessor: "startDate",
  },
  {
    Header: "START TIME",
    accessor: "startTime",
  },
  {
    Header: "END DATE",
    accessor: "recurEndDate",
  },
  {
    Header: "FREQUENCY",
    accessor: "frequency",
  },
  {
    Header: "DURATION",
    accessor: "duration",
  },
  {
    Header: "DEPOSIT",
    accessor: "deposit",
  },
  {
    Header: "PRICE",
    accessor: "price",
  },
  {
    Header: "REPEATS ON",
    accessor: "recurDays",
  },
  {
    Header: "ACTIVE",
    accessor: "active",
  },
  {
    Header: "SITE ACTIONS",
    accessor: "actions",
  },
];

export default function TripsList({ diveTrips }) {
  return (
    <>
      <NextSeo noindex nofollow />
      <Flex direction="column" pt={{ sm: "125px", lg: "75px" }}>
        <Card padding="30px">
          <EventCalendar
            initialDate={new Date()}
            calendarDives={getCalendarDives(diveTrips)}
          />
          <SearchTableDiveTrips
            tableData={diveTrips.filter((dive) => !dive?.generic)}
            columnsData={columnsDataTrips}
          />
        </Card>
      </Flex>
    </>
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

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
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

  if (!diveCentre)
    return {
      redirect: {
        destination: "/business/manage",
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
    .from("dive_trips_view")
    .select("*")
    .eq("diveCentreId", diveCentre.id)
    .order("startDate", { ascending: true });

  // console.log("diveTrips: ", diveTrips);
  return {
    props: {
      session,
      user: session.user,
      diveCentre,
      diveTrips,
    },
  };
};

TripsList.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
