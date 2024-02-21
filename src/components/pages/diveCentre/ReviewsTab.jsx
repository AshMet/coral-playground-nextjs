/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { Flex, Text, useColorModeValue, Box } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";

import Comment from "components/dataDisplay/Comment";
import RatingResult from "components/icons/RatingResult";
import AddReviewModal from "components/modals/AddCentreReviewModal";

dayjs.extend(relativeTime);

export default function ReviewsTab({ centreId }) {
  const textColorTertiary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.500"
  );
  const [reviews, setReviews] = useState(null);
  const [avgRating, setAvgRating] = useState(null);
  const supabase = useSupabaseClient();
  const overallRating =
    (avgRating?.staff +
      avgRating?.equipment +
      avgRating?.environment +
      avgRating?.safety) /
    4;

  async function GetRatings() {
    const { data: centreRatings } = await supabase
      .from("centre_ratings_view")
      .select("*")
      .eq("centreId", centreId);

    const { data: totalRatings } = await supabase
      .from("avg_ratings_view")
      .select("*")
      .eq("centreId", centreId)
      .single();

    if (centreRatings) {
      // console.log("centreRatings", centreRatings);
      setReviews(centreRatings);
    }
    if (totalRatings) {
      // console.log("totalRatings", totalRatings);
      setAvgRating(totalRatings);
    }
  }

  useEffect(() => {
    GetRatings();
  }, []);

  return (
    <Flex direction="column">
      <Flex direction={{ base: "column", md: "row" }} align="center">
        <Box
          w={{ base: "unset", md: "30%", "3xl": "50%" }}
          ms={{ base: "auto", md: "unset" }}
          me={{ base: "auto", "3xl": "50px" }}
          alignContent="center"
        >
          <Text
            fontSize={{ base: "70px", "3xl": "80px" }}
            color="orange.500"
            fontWeight="700"
            lineHeight="105%"
            maxW="max-content"
          >
            {overallRating?.toFixed(1)}
          </Text>
          <RatingResult mb="5px" stars={overallRating} />
          <Text
            fontSize="lg"
            color={textColorTertiary}
            fontWeight="500"
            maxW="max-content"
            mb="20px"
          >
            Overall Rating
          </Text>
          <AddReviewModal centreId={centreId} />
        </Box>
        <Box>
          <RatingResult
            title="Staff"
            mb="5px"
            stars={avgRating?.staff}
            value={avgRating?.staff.toFixed(1)}
          />
          <RatingResult
            title="Environmental Care"
            mb="5px"
            stars={avgRating?.environment}
            value={avgRating?.environment.toFixed(1)}
          />
          <RatingResult
            title="Equipment"
            mb="5px"
            stars={avgRating?.equipment}
            value={avgRating?.equipment.toFixed(1)}
          />
          <RatingResult
            title="Safety"
            mb="5px"
            stars={avgRating?.safety}
            value={avgRating?.safety.toFixed(1)}
          />
        </Box>
      </Flex>

      <Box mt="30px">
        {reviews?.length > 0 ? (
          reviews?.map((review) => (
            <Comment
              avatar={review.avatarUrl}
              name={review.username ? `@${review.username}` : review.firstName}
              text={review.review}
              // tags={["photography", "portrait", "image"]}
              time={dayjs(review.createdAt).fromNow()}
              pe="20px"
            />
          ))
        ) : (
          <>
            <Text color={textColorTertiary} fontSize="md">
              {" "}
              No Comments Yet. Be the first to add a comment.
            </Text>
            <AddReviewModal centreId={centreId} />
          </>
        )}
      </Box>
    </Flex>
  );
}
