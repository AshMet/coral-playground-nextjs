/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-plusplus */
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
// import Moralis from "moralis";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

import AlertPopup from "components/alerts/AlertPopup";
// import DiveSelection from "components/pages/bookings/DiveSelection";
import TripDetails from "components/pages/diveTrips/TripDetails";
import DivingLayout from "layouts/DivingLayout";

export default function NewTrip() {
  // const [tripDives, setTripDives] = useState([]);
  const [price, setPrice] = useState();
  const [minCert, setMinCert] = useState();
  const [active, setActive] = useState();
  const [notes, setNotes] = useState();
  const toast = useToast();

  const router = useRouter();
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: { diveCentreId },
  } = router;

  const API_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/diveTrips`;

  function saveDiveTrip() {
    return axios
      .post(API_URL, {
        diveTrip: {
          price,
          minCert,
          status: active,
          notes,
          diveCentreId: 1,
          dive_site_ids: [1, 2],
        },
      })
      .then(
        (res) => {
          toast({
            position: "top",
            render: () => (
              <AlertPopup
                type="info"
                text="Dive Trip Saved"
                subtext={res.data.name} // Not Working
              />
            ),
          });
          router.push(`/diving/dive_centres/${router.query.diveCentreId}`);
        },
        (error) => {
          toast({
            position: "top",
            render: () => (
              <AlertPopup type="error" text="Booking Error" subtext={error} />
            ),
          });
        }
      );
  }

  return (
    <Box p="0px" mx="auto" mt="100px">
      {/* Row 1: Map  & Calendar */}

      {/* Need to bring this line back in once I've deployed */}
      {/* <DiveSelection tripDives={tripDives} setTripDives={setTripDives} /> */}

      {/* Row 2: List of Dives */}
      <TripDetails
        mb="20px"
        setPrice={setPrice}
        setActive={setActive}
        setMinCert={setMinCert}
        setNotes={setNotes}
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

NewTrip.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
