/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Text, useColorModeValue, Box } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

import Card from "components/card/Card";
import Comment from "components/dataDisplay/Comment";
import RatingResult from "components/icons/RatingResult";
import AddDiverReviewModal from "components/modals/AddDiverReviewModal";

dayjs.extend(relativeTime);

export default function ReviewsTab({ commentRecipientId }) {
  const textColorTertiary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.500"
  );
  const [reviews, setReviews] = useState(null);
  // const [avgRating, setAvgRating] = useState(null);
  const supabase = useSupabaseClient();

  async function GetRatings() {
    const { data: diverRatings } = await supabase
      .from("diver_ratings_view")
      .select("*")
      .eq("commentRecipientId", commentRecipientId);

    if (diverRatings) {
      // console.log("centreRatings", centreRatings);
      setReviews(diverRatings);
    }
  }

  useEffect(() => {
    GetRatings();
  }, []);

  return (
    <Card>
      <AddDiverReviewModal commentRecipientId={commentRecipientId} />
      <Box mt="30px">
        {reviews?.length > 0 ? (
          reviews?.map((review) => (
            <Comment
              avatar={
                review.avatarUrl ||
                `https://api.dicebear.com/7.x/personas/svg?seed=${review.username}`
              }
              name={review.username ? `@${review.username}` : review.firstName}
              text={review.review}
              ratingsValues={<RatingResult stars={review.rating} />}
              // tags={["photography", "portrait", "image"]}
              time={dayjs(review.createdAt).fromNow()}
              pe="20px"
            />
          ))
        ) : (
          <Text color={textColorTertiary} fontSize="md">
            {" "}
            No Comments Yet. Be the first to add a comment.
          </Text>
        )}
      </Box>
    </Card>
  );
}
