/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Flex } from "@chakra-ui/react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextSeo } from "next-seo";

import Card from "components/card/Card";
import SearchTableDiveTrips from "components/tables/SearchTableDiveTrips";
import DivingLayout from "layouts/DivingLayout";

const columnsDataTrips = [
  {
    Header: "ID",
    accessor: "id",
  },
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
    Header: "START_DATE",
    accessor: "startDate",
  },
  {
    Header: "START_TIME",
    accessor: "startTime",
  },
  {
    Header: "END_DATE",
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
    Header: "RECUR_DAYS",
    accessor: "recurDays",
  },
  {
    Header: "DIVE_CENTRE",
    accessor: "diveCentreName",
  },
  {
    Header: "TYPE",
    accessor: "generic",
  },
  {
    Header: "ACTIVE",
    accessor: "active",
  },
  {
    Header: "SITE_ACTIONS",
    accessor: "actions",
  },
];

export default function TripsList({ diveTrips }) {
  return (
    <>
      <NextSeo noindex nofollow />
      <Flex direction="column" pt={{ sm: "125px", lg: "75px" }}>
        <Card px="0px">
          <SearchTableDiveTrips
            tableData={diveTrips}
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

  const { data: diveTrips } = await supabase
    .from("dive_trips_view")
    .select("*")
    .order("name", { ascending: true });

  // const { data: superAdmin } = await supabase.rpc("is_claims_admin", {});
  // const { data: siteAdmin, error } = await supabase.rpc(
  //   "get_my_claim",
  //   '"user_role"'
  // );
  const userRole = session?.user.app_metadata.user_role;

  if (userRole === "ADMIN") {
    return {
      props: {
        diveTrips,
        session,
        user: session.user,
        centreData: [],
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};

TripsList.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
