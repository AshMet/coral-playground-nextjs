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
  const { commentRecipientId } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rating, setRating] = useState(0);
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
      .from("diver_ratings")
      .insert({
        comment_recipient_id: commentRecipientId,
        commenter_id: user.id,
        rating,
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
            text="Unable to save Comment"
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
            text="Comment Saved"
            subtext={data.name} // Not Working
          />
        ),
      });
      onClose();
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
              <FormLabel>Rating</FormLabel>
              <StarRating rating={rating} setRating={setRating} />
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
