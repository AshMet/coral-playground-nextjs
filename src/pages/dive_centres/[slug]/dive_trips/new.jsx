/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable sonarjs/no-duplicated-branches */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-plusplus */
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useState } from "react";

import DiveTripForm from "components/forms/DiveTripForm";
import DivingLayout from "layouts/DivingLayout";

export default function CreateCentreTrip() {
  const today = new Date();
  const nextMonth = new Date(today.setMonth(today.getMonth() + 3));

  const initialState = {
    name: "",
    description: "",
    startDate: new Date(),
    startTime: "07:00",
    frequency: "Daily",
    diveCount: 1,
    // eslint-disable-next-line prettier/prettier
    duration: {"hours": 8},
    timezone: "Africa/Cairo",
    recurEndDate: nextMonth,
    checkin: 60,
    recurDays: [],
    price: 0,
    minCert: "open_water",
    active: false,
    generic: true,
  };

  const [diveTrip, setDiveTrip] = useState(initialState);

  const router = useRouter();
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: { slug: diveCentreSlug },
  } = router;

  return (
    <>
      <NextSeo noindex nofollow />
      <Box p="0px" mx="auto" maxW="100%">
        <DiveTripForm
          diveTrip={diveTrip}
          setDiveTrip={setDiveTrip}
          diveCentreSlug={diveCentreSlug}
        />
      </Box>
    </>
  );
}

CreateCentreTrip.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
