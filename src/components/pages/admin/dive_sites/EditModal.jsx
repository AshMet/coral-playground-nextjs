/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";

import InputField from "components/fields/InputField";

export default function EditModal({ diveSiteData }) {
  const { name } = diveSiteData;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [diveSite, setDiveSite] = useState(diveSiteData);

  const handleChange = (e) => {
    setDiveSite({ ...diveSite, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Button onClick={onOpen}>Edit</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <InputField
              name="name"
              label="Name"
              value={name}
              placeholder="Name"
              onChange={handleChange}
              isError={name === ""}
              errorMessage="Name cannot be empty"
              isRequired
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
