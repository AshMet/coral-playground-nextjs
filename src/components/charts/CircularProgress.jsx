/* eslint-disable react/prop-types */
import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function getPercent(title, value) {
  let percent = 0;
  if (title === "Depth" || title === "DEP") {
    percent = value > 50 ? 95 : (value * 100) / 50;
  } else if (title === "Visibility" || title === "VIS") {
    percent = value > 50 ? 95 : (value * 100) / 50;
  } else if (title === "Current" || title === "CUR") {
    switch (value) {
      case "Weak":
        percent = 20;
        break;
      case "Medium":
        percent = 50;
        break;
      case "High":
        percent = 80;
        break;
      default:
        break;
    }
  } else {
    percent = 0.05;
  }
  return percent;
}

function getIndicatorColor(title, percentage) {
  let indicatorColor = `#8318FF`;
  if (percentage < 33) {
    indicatorColor =
      title === "Visibility" || title === "VIS" ? `#9b2226` : `#0a9396`;
  } else if (percentage >= 33 && percentage < 66) {
    indicatorColor = `#ee9b00`;
  } else if (percentage >= 66 && percentage < 100) {
    indicatorColor =
      title === "Visibility" || title === "VIS" ? `#0a9396` : `#9b2226`;
  }
  return indicatorColor;
}

export default function CircProgress(props) {
  const { title, value, text } = props;
  const percentage = getPercent(title, value);
  const indicatorColor = getIndicatorColor(title, percentage);

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
  const { title, value } = props;

  const percentage = getPercent(title, value);
  const indicatorColor = getIndicatorColor(title, percentage);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const stylesColorMode = useColorModeValue(
    {
      textSize: "0px",
      textColor: "transparent",
      pathTransitionDuration: 0.5,
      pathColor: indicatorColor,
      trailColor: "#E9EDF7",
      backgroundColor: "#3e98c7",
    },
    {
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
      text={`${title}`}
      styles={buildStyles(stylesColorMode)}
    >
      <Box>
        <Text fontSize="sm" color={textColor} fontWeight="700">
          {title}
        </Text>
      </Box>
    </CircularProgressbarWithChildren>
  );
}
