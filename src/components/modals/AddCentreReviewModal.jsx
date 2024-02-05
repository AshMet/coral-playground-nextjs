/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

import AlertPopup from "components/alerts/AlertPopup";
import StarRating from "components/icons/StarRating";

export default function AddReviewModal(props) {
  const { centreId } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [staffRating, setStaffRating] = useState(0);
  const [equipRating, setEquipRating] = useState(0);
  const [envRating, setEnvRating] = useState(0);
  const [safetyRating, setSafetyRating] = useState(0);
  const [review, setReview] = useState(null);
  const supabase = useSupabaseClient();
  const user = useUser();
  const toast = useToast();

  function requestLogin() {
    toast({
      position: "top",
      render: () => (
        <AlertPopup type="warning" text="Please Login to add a review" />
      ),
    });
  }

  async function saveRatings() {
    const { data, error } = await supabase
      .from("centre_ratings")
      .insert({
        dive_centre_id: centreId,
        user_id: user.id,
        staff_rating: staffRating,
        equipment_rating: equipRating,
        environment_rating: envRating,
        safety_rating: safetyRating,
        review,
      })
      .select("*")
      .single();

    if (error) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="danger"
            text="Unable to save Ratings / Review"
            subtext={error.message}
          />
        ),
      });
      // posthog.capture("Dive Trip Creation Failed", {
      //   "Dive Centre": diveCentre?.name,
      //   Error: error.message,
      // });
    } else if (data) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="success"
            text="Ratings / Review Saved"
            subtext={data.name} // Not Working
          />
        ),
      });
    }
  }

  return (
    <>
      <Button
        bgColor="brand.100"
        color="white"
        onClick={user ? onOpen : requestLogin}
      >
        Add a Review
      </Button>

      <Modal
        // initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Rate & Review your experience with this dive business
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Staff</FormLabel>
              <StarRating rating={staffRating} setRating={setStaffRating} />
            </FormControl>

            <FormControl>
              <FormLabel>Equipment</FormLabel>
              <StarRating rating={equipRating} setRating={setEquipRating} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Environmental Care</FormLabel>
              <StarRating rating={envRating} setRating={setEnvRating} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Safety</FormLabel>
              <StarRating rating={safetyRating} setRating={setSafetyRating} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Review</FormLabel>
              <Textarea
                placeholder="Please provide any details you have of your visit to help other divers"
                rows={5}
                onChange={(e) => setReview(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={saveRatings}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
