/* eslint-disable react/prop-types */
import {
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
import { FaRegAddressCard } from "react-icons/fa";

import IconLinkCircle from "components/fields/IconLinkCircle";
import CentreCertForm from "components/forms/CentreCertForm";

export default function AddCentreCertModal(props) {
  const { diveCentreData, certs, nextUrl } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const initialState = {
    certId: certs[0].id,
    stripePriceId: certs[0].stripe_price_id,
    price: 0,
    active: true,
    diveCentreId: diveCentreData.id,
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorTertiary = useColorModeValue(
    "secondaryGray.700",
    "secondaryGray.500"
  );

  // console.log("diveCentreData", diveCentreData);

  const [diveCentreCert, setDiveCentreCert] = useState(initialState);
  return (
    <>
      <IconLinkCircle
        title="Certs"
        icon={FaRegAddressCard}
        url={`/dive_centres/${diveCentreData?.slug}`}
        onClick={onOpen}
      />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={10} bgColor={useColorModeValue("white", "navy.800")}>
            <Text color={textColor} fontSize="xl" fontWeight="700" mt="10px">
              Add Course to {diveCentreData.name}
            </Text>
            <Text color={textColorTertiary} fontSize="md" mb="30px">
              Select which certification course you would like to sign up for
            </Text>
            <CentreCertForm
              diveCentreSlug={diveCentreData.slug}
              diveCentreCert={diveCentreCert}
              setDiveCentreCert={setDiveCentreCert}
              certs={certs}
              nextUrl={nextUrl}
              onOpen={onOpen}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
