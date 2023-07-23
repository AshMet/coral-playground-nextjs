/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable sonarjs/no-duplicated-branches */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-plusplus */
import { Box, Button, Flex, Grid, useToast } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";

import AlertPopup from "components/alerts/AlertPopup";
import MiniCalendar from "components/calendar/MiniCalendar";
import DiveSelection from "components/pages/bookings/DiveSelection";
import Summary from "components/pages/diveTrips/Summary";
import TripDetails from "components/pages/diveTrips/TripDetails";
import DivingLayout from "layouts/DivingLayout";

export default function CreateCentreTrip() {
  const [selectedSites, setSelectedSites] = useState([]);
  const [price, setPrice] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [checkIn, setCheckIn] = useState("1_hour");
  const [duration, setDuration] = useState();
  const [minCert, setMinCert] = useState("open_water");
  const [active, setActive] = useState(true);
  const [diveTime, setDiveTime] = useState("07:00");
  const [diveDate, setDiveDate] = useState();
  const [diveCount, setDiveCount] = useState(1);
  const [payNow, setPayNow] = useState();
  const toast = useToast();
  const posthog = usePostHog();
  const supabase = useSupabaseClient();

  const getStripePriceId = (n) => {
    switch (n) {
      case 1:
        return process.env.NODE_ENV === "development"
          ? "price_1LuqESAvLPvC9h7xbA3kQhgH"
          : "price_1M7v52AvLPvC9h7xKhGRAJss";
      case 2:
        return process.env.NODE_ENV === "development"
          ? "price_1M659GAvLPvC9h7xSxCVcVPv"
          : "price_1M7v5AAvLPvC9h7xXq1s7Lsg";
      case 3:
        return process.env.NODE_ENV === "development"
          ? "price_1LuqGLAvLPvC9h7xTYNbk7hI"
          : "price_1M7v5IAvLPvC9h7xF54jEsGG";
      default:
        return process.env.NODE_ENV === "development"
          ? "price_1M659GAvLPvC9h7xSxCVcVPv"
          : "price_1M7v5AAvLPvC9h7xXq1s7Lsg";
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
    query: { slug: diveCentreSlug },
  } = router;

  useEffect(() => {
    posthog.capture("$pageview");
  }, []);

  async function saveDiveTrip() {
    const { data: diveCentre } = await supabase
      .from("dive_centres")
      .select("id, name")
      .eq("slug", diveCentreSlug)
      .single();

    const { data, error: diveTripError } = await supabase
      .from("dive_trips")
      .insert([
        {
          name,
          description,
          check_in: checkIn,
          start_date: diveDate,
          start_time: diveTime,
          duration,
          min_cert: minCert,
          active,
          price,
          dive_count: diveCount,
          stripe_price_id: getStripePriceId(diveCount),
          pay_now: getPayNow(diveCount),
          dive_centre_id: diveCentre.id,
        },
      ])
      .select("*")
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
      posthog.capture("Dive Trip Creation Failed", {
        "Dive Centre": diveCentre?.name,
        Error: diveTripError.message,
      });
    } else if (data) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="success"
            text="Dive Trip Saved"
            // subtext={data} // Not Working
          />
        ),
      });
      posthog.capture("Dive Trip Created", {
        "Dive Centre": diveCentre.name,
        "Dive Trip": data.name,
        "Pay Now": data.pay_now / 100,
        Price: data.price / 100,
        Duration: data.duration,
        "Dive Count": data.diveCount,
        "Trip Type": data.start_date ? "One-Off" : "Daily",
        Status: data.active ? "Active" : "Inactive",
      });
      router.push(`/dive_centres/${diveCentreSlug}`);
    }
  }

  useEffect(() => {
    setPayNow(getPayNow(diveCount));
  }, [diveCount]);

  return (
    <Box p="0px" mx="auto" mt="100px" maxW="100%">
      <Grid
        maxW="100%"
        display={{ base: "block", lg: "grid" }}
        gridTemplateColumns="2.7fr 1fr"
        gap={5}
      >
        <Box>
          {/* Row 1: Map */}
          <DiveSelection
            setName={setName}
            selectedSites={selectedSites}
            setSelectedSites={setSelectedSites}
            setDiveDate={setDiveDate}
            diveCount={diveCount}
          />
          {/* Row 2: Calendar */}
          <MiniCalendar
            selectRange={false}
            diveDate={diveDate}
            setDiveDate={setDiveDate}
            setDiveTime={setDiveTime}
            diveTime={diveTime}
            diveCount={diveCount}
            setDiveCount={setDiveCount}
          />

          {/* Row 3: Trip form */}
          <TripDetails
            mb="20px"
            name={name}
            price={price}
            minCert={minCert}
            description={description}
            checkIn={checkIn}
            duration={duration}
            active={active}
            setActive={setActive}
            setPrice={setPrice}
            setMinCert={setMinCert}
            setDescription={setDescription}
            setCheckIn={setCheckIn}
            setDuration={setDuration}
          />
        </Box>
        <Flex direction="column" mt={{ sm: "20px", md: "0px" }}>
          <Summary
            name={name}
            diveDate={diveDate}
            diveTime={diveTime}
            duration={duration}
            price={price}
            payNow={payNow}
          />
          <Button
            // isLoading={tripDives.length === 0}
            // isDisabled={tripDives.length === 0}
            loadingText="Select a Dive"
            spinnerPlacement="end"
            // spinner={<BeatLoader size={8} color='white' />}
            variant="darkBrand"
            fontSize="sm"
            borderRadius="16px"
            w="100%"
            h="46px"
            ms="auto"
            onClick={saveDiveTrip}
          >
            Add Dive Trip
          </Button>
        </Flex>
      </Grid>
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
