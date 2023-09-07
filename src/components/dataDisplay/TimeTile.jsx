/* eslint-disable react/prop-types */
import { Flex, Stack, Text } from "@chakra-ui/react";

export default function TimeTile({ date, time, tileSize, ...rest }) {
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
        bg="purple.400"
        color="black"
        {...rest}
      >
        <Text
          mb="2px"
          fontWeight="500"
          fontSize={tileSize === "sm" ? "sm" : "md"}
        >
          {date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          })}
        </Text>
        <Text
          lineHeight="100%"
          fontSize={tileSize === "sm" ? "15px" : "25px"}
          fontWeight="700"
        >
          {time?.split(":")[0]}:{time?.split(":")[1]}
        </Text>
      </Flex>
    </Stack>
  );
}
