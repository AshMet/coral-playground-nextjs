/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
import { Flex, Stack, Text } from "@chakra-ui/react";

export default function TimeTile(props) {
  const { date, time, timezone, duration, tileSize, ...rest } = props;

  // console.log("tripDate", tripDate);

  return (
    <Stack>
      <Flex
        // me="20px"
        direction="column"
        align="center"
        justify="center"
        w={tileSize === "sm" ? "60px" : "77px"}
        h={tileSize === "sm" ? "50px" : "77px"}
        borderRadius="15px"
        bg="brand.400"
        color="black"
        p={2}
        {...rest}
      >
        <Flex direction={tileSize === "sm" ? "row-reverse" : "column"}>
          <Text
            // mb={0}
            fontWeight="500"
            fontSize={tileSize === "sm" ? "sm" : "md"}
            // display={tileSize === "sm" ? "sm" : "md"}
          >
            {!isNaN(date)
              ? date.toLocaleDateString("en-US", {
                  month: "short",
                })
              : ""}
          </Text>
          <Text
            mr={1}
            fontSize={isNaN(date) || tileSize === "sm" ? "sm" : "md"}
            fontWeight="700"
            align="center"
          >
            {!isNaN(date)
              ? date.toLocaleDateString("en-US", {
                  day: "numeric",
                })
              : "Select Date"}
          </Text>
        </Flex>
        <Text
          // mb="2px"
          fontWeight="500"
          fontSize={tileSize === "sm" ? "sm" : "md"}
        >
          {/* {!isNaN(tripDate) ? tripDate.format("HH:mm") : "Select Date"} */}
          {time?.split(":")[0]}:{time?.split(":")[1]}
        </Text>
      </Flex>
    </Stack>
  );
}
