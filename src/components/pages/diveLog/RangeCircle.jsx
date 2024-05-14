/* eslint-disable react/prop-types */
// Chakra imports
import { Flex, Text, useColorModeValue, Spacer, Box } from "@chakra-ui/react";
// Assets
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import Card from "components/card/Card";
// Custom components

export default function CircularProgress({
  title,
  value,
  percentage,
  unit,
  subtitle1,
  subtitle2,
  value1,
  value2,
}) {
  // const [temperature, setTemperature] = useState(21);
  // Chakra Color Mode
  const stylesColorMode = useColorModeValue(
    {
      rotation: -0.4,
      textSize: "0px",
      textColor: "transparent",
      pathTransitionDuration: 0.5,
      pathColor: "#4318FF",
      trailColor: "#E9EDF7",
      backgroundColor: "#3e98c7",
    },
    {
      rotation: -0.4,
      textSize: "0px",
      pathTransitionDuration: 0.5,
      pathColor: "#4318FF",
      textColor: "transparent",
      trailColor: "#1B254B",
    }
  );
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardBg = useColorModeValue("white", "navy.700");
  return (
    <Flex
      direction="column"
      align="center"
      alignSelf="center"
      textAlign="center"
      position="relative"
    >
      <CircularProgressbarWithChildren
        value={percentage * 0.8}
        text={title}
        styles={buildStyles(stylesColorMode)}
      />
      <Text
        fontSize="sm"
        color="secondaryGray.600"
        fontWeight="500"
        position="absolute"
        top="30%"
      >
        {title}
      </Text>
      <Text
        color={textColor}
        fontSize="34px"
        fontWeight="bold"
        position="absolute"
        top="35%"
      >{`${value} ${unit}`}</Text>
      <Card
        borderRadius="12px"
        p="20px 30px"
        flexDirection="row"
        bg={cardBg}
        mt="-50px"
      >
        <Flex direction="row" py="5px" justifyContent="space-between">
          <Box py="5px">
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              {subtitle1}
            </Text>
            <Text fontSize="lg" color={textColor} fontWeight="700">
              {value1}
            </Text>
          </Box>
          <Spacer />
          <Box py="5px" ml={20}>
            <Text
              fontSize="xs"
              color="secondaryGray.600"
              fontWeight="700"
              mb="5px"
            >
              {subtitle2}
            </Text>
            <Text fontSize="lg" color={textColor} fontWeight="700">
              {value2}
            </Text>
          </Box>
        </Flex>
      </Card>
    </Flex>
  );
}
