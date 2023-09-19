/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import DiveCentreForm from "components/forms/DiveCentreForm";

export default function CentreModal({ diveCentreData, type }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [diveCentre, setDiveCentre] = useState(diveCentreData);
  return (
    <>
      <Button
        colorScheme={type === "edit" ? "red" : "green"}
        maxW="200px"
        ml="20px"
        onClick={onOpen}
      >
        {type === "edit" ? "Edit" : "Create New"}
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="4xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody
            pb={10}
            pt="30px"
            bgColor={useColorModeValue("white", "navy.800")}
          >
            <DiveCentreForm
              diveCentre={diveCentre}
              setDiveCentre={setDiveCentre}
              noRedirect
              type={type}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
