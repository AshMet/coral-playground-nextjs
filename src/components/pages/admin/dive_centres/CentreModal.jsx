/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { MdEdit } from "react-icons/md";

import IconLinkCircle from "components/fields/IconLinkCircle";
import DiveCentreForm from "components/forms/DiveCentreForm";

export default function CentreModal({ diveCentreData, type }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [diveCentre, setDiveCentre] = useState(diveCentreData);
  return (
    <>
      <IconLinkCircle
        title={type === "edit" ? "Edit" : "Create"}
        icon={MdEdit}
        url={`/dive_centres/${diveCentre?.slug}/edit`}
        onClick={onOpen}
      />
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
