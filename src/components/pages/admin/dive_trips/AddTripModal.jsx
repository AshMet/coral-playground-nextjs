/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import DiveTripForm from "components/forms/DiveTripForm";
import { in3Months } from "utils/helpers/diveCentresHelper";

export default function TripModal({ diveCentreData, btnText }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

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
    recurEndDate: in3Months,
    checkin: 60,
    recurDays: [],
    price: 0,
    minCert: "open_water",
    active: true,
    generic: true,
    diveCentreId: diveCentreData.id,
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorTertiary = useColorModeValue(
    "secondaryGray.700",
    "secondaryGray.500"
  );

  // console.log("diveCentreData", diveCentreData);

  const [diveTrip, setDiveTrip] = useState(initialState);
  return (
    <>
      <Button
        colorScheme={btnText === "Edit" ? "red" : "green"}
        maxW="200px"
        ml="20px"
        onClick={onOpen}
      >
        {btnText || "New"}
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={10} bgColor={useColorModeValue("white", "navy.800")}>
            <Text color={textColor} fontSize="xl" fontWeight="700" mt="10px">
              Create a new Dive Trip for {diveCentreData.name}
            </Text>
            <Text color={textColorTertiary} fontSize="md" mb="30px">
              You can always confirm your selections in the summmary section
            </Text>
            <DiveTripForm
              diveCentreSlug={diveCentreData.slug}
              diveTrip={diveTrip}
              setDiveTrip={setDiveTrip}
              nextUrl="/admin/dive_trips"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
