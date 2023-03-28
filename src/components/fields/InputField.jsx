/* eslint-disable react/prop-types */
// Chakra imports
import {
  Flex,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
  useColorModeValue,
  FormControl,
} from "@chakra-ui/react";
// Custom components

export default function Default(props) {
  const {
    id,
    label,
    extra,
    placeholder,
    type,
    mb,
    isError,
    isRequired,
    errorMessage,
    ...rest
  } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const borderPrimary = useColorModeValue(
    "secondaryGray.100",
    "whiteAlpha.100"
  );

  return (
    <FormControl isInvalid={isError} isRequired={isRequired}>
      <Flex direction="column" mb={mb || "30px"}>
        <FormLabel
          display="flex"
          ms="10px"
          htmlFor={id}
          fontSize="sm"
          color={textColorPrimary}
          fontWeight="bold"
          _hover={{ cursor: "pointer" }}
        >
          {label}
          <Text fontSize="sm" fontWeight="400" ms="2px">
            {extra}
          </Text>
        </FormLabel>
        <Input
          {...rest}
          type={type}
          id={id}
          fontWeight="500"
          variant="main"
          placeholder={placeholder}
          _placeholder={{ fontWeight: "400", color: "secondaryGray.600" }}
          h="44px"
          maxh="44px"
          borderColor={borderPrimary}
        />
        {isError && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
      </Flex>
    </FormControl>
  );
}
