/* eslint-disable no-console */
/* eslint-disable react/prop-types */
// Chakra imports
import { Text, Box, useColorModeValue } from "@chakra-ui/react";
// Custom components
import { useContext } from "react";

import { DivingContext } from "../../../contexts/DivingContext";
import Card from "components/card/Card";
import TimelineItem from "components/dataDisplay/TimelineItem";

export default function DiveList(props) {
  const { ...rest } = props;
  const { dives, setDives } = useContext(DivingContext);

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
        <Text fontSize="2xl" fontWeight="700" color={textColor} mb="15px">
          Selected Dives
        </Text>
        {/* <Text
          fontSize="md"
          fontWeight="500"
          color="secondaryGray.600"
          mb="30px"
        >
          Complete your itinerary then continue to payment
        </Text> */}
      </Box>
      {dives.length > 0 ? (
        dives.map((dive) => (
          <TimelineItem
            key={dive.id}
            id={dive.id}
            mb="16px"
            title={dive.siteName}
            subtitle={dive.centreName}
            day={dive.diveDate?.toLocaleDateString("en-US", { day: "numeric" })}
            weekday={dive.diveDate?.toLocaleDateString("en-US", {
              month: "short",
            })}
            hours={dive.diveDate?.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            removeDive={removeDive}
            confirmed
          />
        ))
      ) : (
        <Text fontSize="md" fontWeight="500" color={purpleColor} my="30px">
          No dives selected. Please add at least one dive to continue
        </Text>
      )}
    </Card>
  );
}
