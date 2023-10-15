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
import { MdAdd } from "react-icons/md";

import IconLinkCircle from "components/fields/IconLinkCircle";
import CentreEquipForm from "components/forms/CentreEquipForm";

export default function AddEqiupModal({ diveCentreData, equipment, nextUrl }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const initialState = {
    equipmentId: equipment[0].id,
    stripePriceId: equipment[0].stripe_price_id,
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

  const [diveCentreEquip, setDiveCentreEquip] = useState(initialState);
  return (
    <>
      <IconLinkCircle
        title="Equip"
        icon={MdAdd}
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
              Add Equipment item to {diveCentreData.name}
            </Text>
            <Text color={textColorTertiary} fontSize="md" mb="30px">
              Select which equipment you want to customers to be able to add to
              their dive trip
            </Text>
            <CentreEquipForm
              diveCentreSlug={diveCentreData.slug}
              diveCentreEquip={diveCentreEquip}
              setDiveCentreEquip={setDiveCentreEquip}
              equipment={equipment}
              nextUrl={nextUrl}
              onOpen={onOpen}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
