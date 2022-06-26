/* eslint-disable react/prop-types */
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CircProgress(props) {
  const { title, percentage, text } = props;
  let indicatorColor = `#8318FF`;

  if (percentage < 33) {
    indicatorColor = `#0a9396`;
  } else if (percentage >= 33 && percentage < 66) {
    indicatorColor = `#ee9b00`;
  } else if (percentage >= 66 && percentage < 100) {
    indicatorColor = `#9b2226`;
  }
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const stylesColorMode = useColorModeValue(
    {
      // rotation: 0.25,
      textSize: "0px",
      textColor: "transparent",
      pathTransitionDuration: 0.5,
      pathColor: indicatorColor,
      trailColor: "#E9EDF7",
      backgroundColor: "#3e98c7",
    },
    {
      // rotation: 0.25,
      textSize: "0px",
      pathTransitionDuration: 0.5,
      pathColor: indicatorColor,
      textColor: "transparent",
      trailColor: "#1B254B",
    }
  );
  return (
    <CircularProgressbarWithChildren
      value={percentage}
      text={text || `${percentage}%`}
      styles={buildStyles(stylesColorMode)}
    >
      <Box>
        <Text fontSize="sm" color="secondaryGray.600" fontWeight="500">
          {title}
        </Text>
        <Text fontSize="xl" color={textColor} fontWeight="700">
          {text || `${percentage}%`}
        </Text>
      </Box>
    </CircularProgressbarWithChildren>
  );
}

export function CircProgressMini(props) {
  const { step, percentage } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const stylesColorMode = useColorModeValue(
    {
      textSize: "0px",
      textColor: "transparent",
      pathTransitionDuration: 0.5,
      pathColor: `#01B574`,
      trailColor: "#E9EDF7",
      backgroundColor: "#3e98c7",
    },
    {
      textSize: "0px",
      pathTransitionDuration: 0.5,
      pathColor: `#01B574`,
      textColor: "transparent",
      trailColor: "#1B254B",
    }
  );
  return (
    <CircularProgressbarWithChildren
      value={percentage}
      text={`${step}`}
      styles={buildStyles(stylesColorMode)}
    >
      <Box>
        <Text fontSize="sm" color={textColor} fontWeight="700">
          {step}
        </Text>
      </Box>
    </CircularProgressbarWithChildren>
  );
}
