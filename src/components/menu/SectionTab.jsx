// Individual menu items on the Site and Centre details pages

/* eslint-disable react/prop-types */
import {
  Box,
  chakra,
  Flex,
  Tab,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function SectionTab(props) {
  const { title, stateName, counterItem, tabState, setTabState } = props;
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorTertiary = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.500"
  );

  return (
    <Tab
      pb="0px"
      flexDirection="column"
      onClick={() => {
        setTabState(stateName);
      }}
      me="10px"
      bg="unset"
      _selected={{
        bg: "none",
      }}
      _focus={{ border: "none" }}
      minW="max-content"
    >
      <chakra.span pos="relative" display="inline-block">
        <Flex align="center">
          <Text
            color={tabState === stateName ? textColor : textColorTertiary}
            fontSize="lg"
            fontWeight="500"
          >
            {title}
          </Text>
        </Flex>
        <Box
          height="4px"
          w="100%"
          transition="0.1s linear"
          bg={tabState === stateName ? "brand.400" : "transparent"}
          mt="15px"
          borderRadius="30px"
        />
        {counterItem?.length > 0 && (
          <chakra.span
            pos="absolute"
            top="-4px"
            right="-1px"
            px={2}
            py={1}
            fontSize="xs"
            fontWeight="bold"
            lineHeight="none"
            color="red.100"
            transform="translate(50%,-50%)"
            bg="red.600"
            rounded="full"
          >
            {counterItem?.length}
          </chakra.span>
        )}
      </chakra.span>
    </Tab>
  );
}
