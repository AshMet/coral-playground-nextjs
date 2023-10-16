/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-plusplus */
import { Box, Button, Flex, Grid, useToast } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";
import { useRouter } from "next/router";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";

import AlertPopup from "components/alerts/AlertPopup";
import TripDetailsForm from "components/forms/TripDetailsForm";
import TripSchedulingForm from "components/forms/TripSchedulingForm";
import TripSummaryForm from "components/forms/TripSummaryForm";

export default function DiveTripForm(props) {
  const { diveCentreSlug, diveTrip, setDiveTrip, nextUrl } = props;
  const [selectedSites, setSelectedSites] = useState([]);
  const [tripType, setTripType] = useState("generic");
  const toast = useToast();
  const posthog = usePostHog();
  const supabase = useSupabaseClient();
  const router = useRouter();
  // const commission = 0.1;

  // console.log("new trip centre slug", diveCentreSlug);
  const {
    name,
    diveCount,
    description,
    active,
    duration,
    startDate,
    startTime,
    minCert,
    price,
    frequency,
    timezone,
    recurDays,
    recurEndDate,
    checkin,
    generic,
  } = diveTrip || {};

  useEffect(() => {
    posthog.capture("$pageview");
  }, []);

  async function saveDiveTrip() {
    const { data: diveCentre } = await supabase
      .from("dive_centres")
      .select("id, name")
      .eq("slug", diveCentreSlug)
      .single();

    // Create Stripe product
    const {
      data: { id: stripeProdId },
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/create_product`,
      {
        name,
        // active,
        // description,
        // metadata: { dive_trip_id: diveTripData.id },
      }
    );
    // console.log("stripeProdId", stripeProdId);

    // Create Stripe price
    const {
      data: { id: stripePriceId },
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/create_price`,
      {
        // active,
        // description,
        currency: "eur",
        nickname: `${name} - €${price / 100}`,
        lookup_key: `${name.replace(/ /g, "_").toLowerCase()}_${price}eur`,
        product: stripeProdId,
        type: "one_time",
        unit_amount: price,
        // custom_unit_amount: {
        //   preset: price * commission,
        // },
      }
    );

    // console.log("stripePriceId", stripePriceId);

    const { data: diveTripData, error: diveTripError } = await supabase
      .from("dive_trips")
      .insert([
        {
          name,
          description,
          start_date: startDate,
          start_time: startTime,
          duration,
          min_cert: minCert,
          active,
          price,
          deposit: price * 0.15,
          dive_count: diveCount,
          frequency,
          stripe_price_id: stripePriceId,
          stripe_product_id: stripeProdId,
          dive_centre_id: diveCentre.id,
          timezone,
          recur_days: recurDays,
          recur_end_date: recurEndDate,
          checkin,
          generic,
        },
      ])
      .select("*")
      .single();

    // Handle Trip Data
    const insertTripSites = selectedSites.map((site) => ({
      dive_site_id: site.id,
      dive_trip_id: diveTripData.id,
    }));

    await supabase
      .from("trip_sites")
      .insert(
        insertTripSites.length === 1 ? insertTripSites[0] : insertTripSites
      )
      .select();

    if (diveTripError) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="danger"
            text="Unable to save Dive Trip"
            subtext={diveTripError.message}
          />
        ),
      });
      posthog.capture("Dive Trip Creation Failed", {
        "Dive Centre": diveCentre?.name,
        Error: diveTripError.message,
      });
    } else if (diveTripData) {
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
        "Dive Trip": diveTripData.name,
        Deposit: diveTripData.deposit / 100,
        Price: diveTripData.price / 100,
        Duration: diveTripData.duration,
        "Dive Count": diveTripData.diveCount,
        "Trip Type": diveTripData.generic ? "Generic" : "Site-Specific",
        Status: diveTripData.active ? "Active" : "Inactive",
      });
      router.push(nextUrl || `/dive_centres/${diveCentreSlug}`);
    }
  }

  // console.log("diveTrip", diveTrip);

  useEffect(() => {
    const noSitesName = `${diveCount} Dive Package`;
    const sitesName = selectedSites?.map((site) => site.name).join(" + ");
    if (tripType === "site-specific") {
      setDiveTrip({
        ...diveTrip,
        name:
          selectedSites.length <= diveCount - 1 && selectedSites.length > 0
            ? `${sitesName} (${diveCount} dives)`
            : sitesName,
      });
    } else {
      setDiveTrip({ ...diveTrip, name: noSitesName });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSites, diveCount, tripType]);

  // console.log("generic", tripType);
  // console.log("diveTrip", diveTrip);

  return (
    <Grid
      maxW="100%"
      display={{ base: "block", lg: "grid" }}
      gridTemplateColumns="2.7fr 1fr"
      gap={5}
    >
      <Box>
        {/* Row 1: Trip Details */}
        <TripDetailsForm
          mb="20px"
          diveTrip={diveTrip}
          setDiveTrip={setDiveTrip}
          selectedSites={selectedSites}
          setSelectedSites={setSelectedSites}
          tripType={tripType}
          setTripType={setTripType}
        />
        {/* Row 2: Scheduling */}
        <TripSchedulingForm
          diveTrip={diveTrip}
          setDiveTrip={setDiveTrip}
          selectedSites={selectedSites}
          setSelectedSites={setSelectedSites}
        />
      </Box>
      <Flex direction="column" mt={{ sm: "20px", md: "0px" }}>
        {/* Row 2: Trip Details */}
        <TripSummaryForm diveTrip={diveTrip} />
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
          Create Dive Trip
        </Button>
      </Flex>
    </Grid>
  );
}
