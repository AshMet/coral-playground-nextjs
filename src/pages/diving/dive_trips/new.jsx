/* eslint-disable no-plusplus */
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
// import Moralis from "moralis";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import { CoralPgContext } from "../../../contexts/CoralPgContext";
// import data from "../../../lib/data/get_user_role";
import AlertPopup from "components/alerts/AlertPopup";
import DiveSelection from "components/pages/bookings/DiveSelection";
import TripDetails from "components/pages/diveTrips/TripDetails";
import AdminLayout from "layouts/admin";

export default function NewTrip() {
  const [tripDives, setTripDives] = useState([]);
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

  const { user } = useContext(CoralPgContext);
  // const roleQuery = new Moralis.Query(Moralis.Role)
  //   .equalTo("name", "centre_admin")
  //   .first();
  // console.log("role outside", JSON.stringify(roleQuery));

  // useEffect(() => {
  //   if (!Moralis) {
  //     return;
  //   }

  //   const roleQuery = new Moralis.Query(Moralis.Role)
  //     .equalTo("name", "centre_admin")
  //     .find({
  //       success(object) {
  //         console.log("success", object);
  //       },
  //     });

  //   console.log("role", JSON.stringify(roleQuery));
  // }, [user, Moralis]);
  // console.log("data", JSON.stringify(data));

  const saveDiveTrip = async () => {
    const DiveTrip = Moralis.Object.extend("DiveTrips");
    const diveTrip = new DiveTrip();

    const DiveSites = Moralis.Object.extend("DiveSites");
    const diveSiteQuery = new Moralis.Query(DiveSites);
    const siteIds = tripDives.map((dive) => dive.location_id);
    const siteResults = await diveSiteQuery
      .containedIn("objectId", siteIds)
      .find();
    const DiveCentrePointer = {
      __type: "Pointer",
      className: "DiveCentres",
      objectId: router.query.diveCentreId,
    };

    const tripSites = diveTrip.relation("diveSites");
    tripSites.add(siteResults);

    diveTrip
      .save({
        price: price * 100,
        minCert,
        notes,
        orderStatus: active,
        diveCentre: DiveCentrePointer,
        // diveSites: diveSitesPointers,
      })
      .then(
        () => {
          toast({
            position: "top",
            render: () => (
              <AlertPopup
                type="info"
                text="Dive Trip Saved"
                // subtext={JSON.stringify(tripSites)}
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
  };

  // if (roleQuery) {

  // }
  return (
    <Box p="0px" mx="auto" mt="100px">
      {/* Row 1: Map  & Calendar */}
      <DiveSelection tripDives={tripDives} setTripDives={setTripDives} />
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
          isDisabled={tripDives.length === 0}
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
  return <AdminLayout>{page}</AdminLayout>;
};
