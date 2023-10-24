/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-plusplus */
import { Box } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import { NextSeo } from "next-seo";
import { useState } from "react";

import DiveCentreForm from "components/forms/DiveCentreForm";
import DivingLayout from "layouts/DivingLayout";
// import * as gtag from "lib/data/gtag";

export default function CreateDiveCentre() {
  const initialState = {
    name: "",
    description: "",
    address: "",
    latitude: "",
    longitude: "",
    paymentMethods: [],
    equipment: [],
    memberships: [],
    languages: [],
    services: [],
    cityId: "",
    active: false,
  };

  const [diveCentre, setDiveCentre] = useState(initialState);
  const [active, setActive] = useState(false);
  const user = useUser();
  // console.log("user", user);

  return (
    <>
      <NextSeo noindex nofollow />
      <Box p="0px" mx="auto">
        <DiveCentreForm
          diveCentre={diveCentre}
          setDiveCentre={setDiveCentre}
          active={active}
          setActive={setActive}
          newOwnerId={user?.id}
        />
      </Box>
    </>
  );
}

CreateDiveCentre.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
