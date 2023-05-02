/* eslint-disable react/prop-types */
// Chakra imports
import { Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import DailyTripCard from "components/calendar/DailyTripCard";
import Card from "components/card/Card";

export default function Default(props) {
  const { dailyDives, ...rest } = props;
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card {...rest}>
      <Text fontSize="2xl" fontWeight="700" color={textColor}>
        User-Selected Dives
      </Text>
      <Text fontSize="md" fontWeight="500" color="secondaryGray.600" mb="30px">
        Users can select the given dives on any day
      </Text>
      {dailyDives.map((trip) => (
        <DailyTripCard mb="16px" diveTrip={trip} />
      ))}
    </Card>
  );
}
