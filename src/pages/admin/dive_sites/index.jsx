/* eslint-disable react/prop-types */
import { Flex } from "@chakra-ui/react";

import { supabase } from "../../api/index";
import Card from "components/card/Card";
import SearchTableDiveSites from "components/pages/diveSiteAdmin/SearchTableDiveSites";
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
    accessor: "depth",
  },
  {
    Header: "CURRENT",
    accessor: "current",
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

export const getServerSideProps = async () => {
  const { data: diveSites } = await supabase
    .from("dive_sites")
    .select(
      `
    id, name, description, latitude, longitude, min_visibility, max_visibility, depth, current, cert_level, tags, access, dive_map,
    updated_at, city: cities (name)
  `
    )
    .order("name", { ascending: true });

  return {
    props: { diveSites },
  };
};

SitesList.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
