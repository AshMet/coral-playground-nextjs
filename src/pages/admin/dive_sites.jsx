/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import { Flex } from "@chakra-ui/react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import Card from "components/card/Card";
import SearchTableDiveSites from "components/pages/admin/dive_sites/SearchTableDiveSites";
import DivingLayout from "layouts/DivingLayout";

const columnsDataSites = [
  {
    Header: "MAP",
    accessor: "dive_map",
  },
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "MIN_VIS",
    accessor: "min_visibility",
  },
  {
    Header: "MAX_VIS",
    accessor: "max_visibility",
  },
  {
    Header: "DEPTH",
    accessor: "max_depth",
  },
  {
    Header: "CURRENT",
    accessor: "max_current",
  },
  {
    Header: "LAT",
    accessor: "latitude",
  },
  {
    Header: "LNG",
    accessor: "longitude",
  },
  {
    Header: "ACCESS",
    accessor: "access",
  },
  {
    Header: "TAGS",
    accessor: "tags",
  },
  {
    Header: "SITE_ACTIONS",
    accessor: "actions",
  },
];

export default function SitesList({ diveSites }) {
  return (
    <Flex direction="column" pt={{ sm: "125px", lg: "75px" }}>
      <Card px="0px">
        <SearchTableDiveSites
          tableData={diveSites}
          columnsData={columnsDataSites}
        />
      </Card>
    </Flex>
  );
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: diveSites } = await supabase
    .from("dive_sites")
    .select(
      ` id, name, description, latitude, longitude, min_visibility, max_visibility, min_depth, max_depth,
        min_current, max_current, cert_level, tags, access, dive_map, updated_at, city: cities (name)`
    )
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
        diveSites,
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

SitesList.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
