/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Flex } from "@chakra-ui/react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { NextSeo } from "next-seo";

import Card from "components/card/Card";
import SearchTableDiveCentres from "components/tables/SearchTableDiveCentres";
import DivingLayout from "layouts/DivingLayout";

const columnsDataCentres = [
  {
    Header: "COVER",
    accessor: "coverPhotoUrl",
  },
  // {
  //   Header: "ID",
  //   accessor: "id",
  // },
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "DESC",
    accessor: "description",
  },
  {
    Header: "ADDRESS",
    accessor: "address",
  },
  {
    Header: "PAYMENT",
    accessor: "paymentMethods",
  },
  {
    Header: "EQUIPMENT",
    accessor: "equipment",
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
    Header: "MEMBERSHIPS",
    accessor: "memberships",
  },
  {
    Header: "LANGUAGES",
    accessor: "languages",
  },
  {
    Header: "SERVICES",
    accessor: "services",
  },
  {
    Header: "CITY",
    accessor: "city",
  },
  {
    Header: "CITY_ID",
    accessor: "cityId",
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

export default function CentresList({ diveCentres, equipment, certs }) {
  return (
    <>
      <NextSeo noindex nofollow />
      <Flex direction="column">
        <Card px="0px">
          <SearchTableDiveCentres
            tableData={diveCentres}
            columnsData={columnsDataCentres}
            equipment={equipment}
            certs={certs}
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

  const { data: diveCentres } = await supabase
    .from("dive_centres_view")
    .select("*")
    .order("name", { ascending: true });

  // const { data: superAdmin } = await supabase.rpc("is_claims_admin", {});
  // const { data: siteAdmin, error } = await supabase.rpc(
  //   "get_my_claim",
  //   '"user_role"'
  // );
  const { data: equipment } = await supabase.from("equipment").select("*");
  const { data: certs } = await supabase.from("certifications").select("*");
  const userRole = session?.user.app_metadata.user_role;

  if (userRole === "ADMIN") {
    return {
      props: {
        diveCentres,
        session,
        equipment,
        certs,
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

CentresList.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
