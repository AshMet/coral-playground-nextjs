/* eslint-disable no-console */
/* eslint-disable react/prop-types */
// Chakra imports
import { Text, Box, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";
import TimelineItem from "components/dataDisplay/TimelineItem";

export default function DiveList(props) {
  const { dives, setDives, ...rest } = props;
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const purpleColor = useColorModeValue("purple.800", "purple.300");

  const removeDive = (id) => {
    const removedDive = [...dives].filter((dive) => dive.id !== id);
    setDives(removedDive);
  };

  return (
    <Card {...rest}>
      <Box>
        <Text fontSize="2xl" fontWeight="700" color={textColor}>
          Selected Dives
        </Text>
        <Text
          fontSize="md"
          fontWeight="500"
          color="secondaryGray.600"
          mb="30px"
        >
          Complete your itinerary then continue to payment
        </Text>
      </Box>
      {dives.length > 0 ? (
        dives.map((dive) => (
          <TimelineItem
            key={dive.id}
            id={dive.id}
            mb="16px"
            title={dive.siteName}
            day={dive.diveDate?.toLocaleDateString("en-US", { day: "numeric" })}
            weekday={dive.diveDate?.toLocaleDateString("en-US", {
              month: "short",
            })}
            hours={dive.diveTime}
            removeDive={removeDive}
            confirmed
          />
        ))
      ) : (
        <Text fontSize="md" fontWeight="500" color={purpleColor} mb="30px">
          Please add at least one dive to continue
        </Text>
      )}
    </Card>
  );
}
