/* eslint-disable react/prop-types */
// Chakra imports
import { Box, Flex, FormLabel, Switch, Text } from "@chakra-ui/react";

export default function Default(props) {
  const {
    id,
    label,
    isChecked,
    onChange,
    desc,
    textWidth,
    reversed,
    fontSize,
    labelColor,
    ...rest
  } = props;
  return (
    <Box w="100%" fontWeight="500" {...rest}>
      {reversed ? (
        <Flex align="center" borderRadius="16px">
          {isChecked && onChange ? (
            <Switch
              isChecked={isChecked}
              id={id}
              variant="main"
              colorScheme="brandScheme"
              size="md"
              onChange={onChange}
            />
          ) : (
            <Switch
              id={id}
              variant="main"
              colorScheme="brandScheme"
              size="md"
            />
          )}
          <FormLabel
            ms="15px"
            htmlFor={id}
            _hover={{ cursor: "pointer" }}
            direction="column"
            mb="0px"
            maxW={textWidth || "75%"}
          >
            <Text color="red.500" fontSize="md" fontWeight="500">
              {label}
            </Text>
            <Text color="secondaryGray.600" fontSize={fontSize || "md"}>
              {desc}
            </Text>
          </FormLabel>
        </Flex>
      ) : (
        <Flex justify="space-between" align="center" borderRadius="16px">
          <FormLabel
            htmlFor={id}
            _hover={{ cursor: "pointer" }}
            direction="column"
            maxW={textWidth || "75%"}
          >
            <Text color={labelColor} fontSize="md" fontWeight="500">
              {label}
            </Text>
            <Text color="secondaryGray.600" fontSize={fontSize || "md"}>
              {desc}
            </Text>
          </FormLabel>
          {isChecked && onChange ? (
            <Switch
              isChecked={isChecked}
              id={id}
              variant="main"
              colorScheme="brandScheme"
              size="md"
              onChange={onChange}
            />
          ) : (
            <Switch
              id={id}
              variant="main"
              colorScheme="brandScheme"
              size="md"
              onChange={onChange}
            />
          )}
        </Flex>
      )}
    </Box>
  );
}
