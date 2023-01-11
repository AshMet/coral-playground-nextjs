/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-plusplus */
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";

import AlertPopup from "components/alerts/AlertPopup";
import DiveSelection from "components/pages/bookings/DiveSelection";
import TripDetails from "components/pages/diveTrips/TripDetails";
import DivingLayout from "layouts/DivingLayout";
import { supabase } from "pages/api/index";

export default function CreateCentreTrip() {
  const [selectedSites, setSelectedSites] = useState([]);
  const [price, setPrice] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [checkIn, setCheckIn] = useState();
  const [duration, setDuration] = useState();
  const [minCert, setMinCert] = useState();
  const [status, setStatus] = useState(false);
  const [diveTime, setDiveTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const toast = useToast();

  const getStripePriceId = (n) => {
    switch (n) {
      case 1:
        return "price_1LuqESAvLPvC9h7xbA3kQhgH";
      case 2:
        return "price_1M659GAvLPvC9h7xSxCVcVPv";
      case 3:
        return "price_1LuqGLAvLPvC9h7xTYNbk7hI";
      default:
        return "price_1LuqGLAvLPvC9h7xTYNbk7hI";
    }
  };

  const getPayNow = (n) => {
    switch (n) {
      case 1:
        return 500;
      case 2:
        return 1000;
      case 3:
        return 1500;
      default:
        return 1500;
    }
  };

  const router = useRouter();
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: { id: diveCentreId },
  } = router;

  async function saveDiveTrip() {
    const { data, error: diveTripError } = await supabase
      .from("dive_trips")
      .insert({
        name,
        description,
        check_in: checkIn,
        start_date: selectedDate,
        start_time: "01:02:03",
        duration,
        min_cert: minCert,
        status,
        price,
        stripe_price_id: getStripePriceId(selectedSites.length),
        pay_now: getPayNow(selectedSites.length),
        dive_centre_id: diveCentreId,
      })
      .select()
      .single();

    // Handle Trip Data
    const insertTripSites = selectedSites.map((site) => ({
      dive_site_id: site.id,
      dive_trip_id: data.id,
    }));
    // Format insert Data as array only for multiple items
    // const { data: tripSites, error: tripLSitesError } =
    await supabase
      .from("trip_sites")
      .insert(
        insertTripSites.length === 1 ? insertTripSites[0] : insertTripSites
      )
      .select();

    // console.log("new trip", data);

    toast({
      position: "top",
      render: () => (
        <AlertPopup
          type="success"
          text="Dive Trip Saved"
          subtext={data} // Not Working
        />
      ),
    });

    router.push(`/diving/dive_centres/${diveCentreId}`);

    if (diveTripError) {
      // console.log("new trip error", diveTripError);
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="error"
            text="Unable to save Dive Trip"
            subtext={diveTripError}
          />
        ),
      });
    }
  }

  return (
    <Box p="0px" mx="auto" mt="100px">
      {/* Row 1: Map  & Calendar */}
      <DiveSelection
        name={name}
        setName={setName}
        selectedSites={selectedSites}
        setSelectedSites={setSelectedSites}
        diveTime={diveTime}
        setDiveTime={setDiveTime}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Row 2: List of Dives */}
      <TripDetails
        mb="20px"
        name={name}
        setPrice={setPrice}
        setStatus={setStatus}
        setMinCert={setMinCert}
        setDescription={setDescription}
        setCheckIn={setCheckIn}
        setDuration={setDuration}
      />
      {/* <TripsList mb="20px" tripDives={tripDives} setTripDives={setTripDives} /> */}
      <Flex justify="space-between" mt="24px">
        <Button
          // isLoading={tripDives.length === 0}
          // isDisabled={tripDives.length === 0}
          loadingText="Select a Dive"
          spinnerPlacement="end"
          // spinner={<BeatLoader size={8} color='white' />}
          variant="darkBrand"
          fontSize="sm"
          borderRadius="16px"
          w={{ base: "128px", md: "148px" }}
          h="46px"
          ms="auto"
          onClick={saveDiveTrip}
        >
          Save Trip
        </Button>
      </Flex>
    </Box>
  );
}

// export const getServerSideProps = async (context) => {
//   // const { id } = context.query;
//   const Moralis = require("moralis/node");
//   const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
//   const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
//   Moralis.initialize(appId);
//   Moralis.serverURL = serverUrl;
//   const roleQuery = new Moralis.Query(Moralis.Role);
//   roleQuery.equalTo("name", "centre_admin");
//   const data = await roleQuery.first();

//   return {
//     props: { data },
//   };
// };

CreateCentreTrip.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
