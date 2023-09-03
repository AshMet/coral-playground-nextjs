/* eslint-disable react/prop-types */
import { Flex, Stack, Text } from "@chakra-ui/react";

export default function DateTile({ date, time, ...rest }) {
  return (
    <Stack>
      <Flex
        // me="20px"
        direction="column"
        align="center"
        justify="center"
        w="77px"
        h="77px"
        borderRadius="15px"
        bg="purple.400"
        color="black"
        {...rest}
      >
        <Text mb="2px" fontSize="md" fontWeight="500">
          {date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          })}
        </Text>
        <Text lineHeight="100%" fontSize="25px" fontWeight="700">
          {time?.split(":")[0]}:{time?.split(":")[1]}
        </Text>
      </Flex>
    </Stack>
  );
}
