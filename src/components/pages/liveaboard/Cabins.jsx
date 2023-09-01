/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Icon,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

const CabinItem = ({ title, content, features, available, booked }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
  return (
    <AccordionItem border="none">
      <AccordionButton
        _focus="none"
        _hover="none"
        p="20px 0px 20px 0px"
        borderBottom="1px solid"
        borderColor={borderColor}
      >
        <Box flex="1" textAlign="left">
          <Stack direction="row">
            <Text
              color={textColor}
              fontWeight="700"
              fontSize={{ sm: "md", lg: "md" }}
            >
              {title}
            </Text>
            <Badge colorScheme="green">Available: {available}</Badge>
            <Badge colorScheme="red">Booked: {booked} </Badge>
          </Stack>
        </Box>
        <AccordionIcon color="gray.500" />
      </AccordionButton>
      <AccordionPanel p="18px 0px 10px 0px">
        <Text
          fontWeight="500"
          fontSize="md"
          textAlign="left"
          alignSelf="flex-start"
          justifySelf="flex-start"
          mb="10px"
        >
          {content}
        </Text>
        <Table variant="unstyled" size="sm">
          <Tbody>
            {features.map((feature, index) => (
              <Tr key={index}>
                <Td>
                  <Icon as={MdCheckCircle} color="green.500" />
                </Td>
                <Td>
                  <Text key={index} fontWeight="extrabold">
                    {feature.item}:
                  </Text>
                </Td>
                <Td>
                  <Text fontWeight="normal">{feature.value}</Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default function Cabins() {
  return (
    <Accordion
      defaultIndex={[0]}
      allowToggle
      w={{ sm: "100%", md: "100%", xl: "94%" }}
      mb="16px"
    >
      <CabinItem
        title="Standard Cabin lower deck"
        available={3}
        booked={2}
        content="Spacious cabins with en-suite bathroom and aircon, to meet your comfort while onboard."
        features={[
          { item: "Capacity", value: "2 Pax" },
          { item: "Sharing", value: "shareable" },
          { item: "Bed Type", value: "Twin Beds" },
          { item: "Deck", value: "Lower Deck" },
          { item: "Supplement", value: "€ 90  Per Pax Per Trip" },
        ]}
      />
      <CabinItem
        title="Superior cabin lower deck"
        available={2}
        booked={1}
        content="Spacious cabins with en-suite bathroom and aircon, to meet your comfort while onboard."
        features={[
          { item: "Capacity", value: "2 Pax" },
          { item: "Sharing", value: "shareable" },
          { item: "Bed Type", value: "Twin Beds" },
          { item: "Deck", value: "Lower Deck" },
          { item: "Supplement", value: "€ 90  Per Pax Per Trip" },
        ]}
      />
      <CabinItem
        title="Royal suite main deck (dive deck)"
        available={0}
        booked={1}
        content="Spacious cabins with en-suite bathroom and aircon, to meet your comfort while onboard."
        features={[
          { item: "Capacity", value: "2 Pax" },
          { item: "Sharing", value: "shareable" },
          { item: "Bed Type", value: "Twin Beds" },
          { item: "Deck", value: "Lower Deck" },
          { item: "Supplement", value: "€ 90  Per Pax Per Trip" },
        ]}
      />
      <CabinItem
        title="Suite upper deck"
        available={2}
        booked={0}
        content="Spacious cabins with en-suite bathroom and aircon, to meet your comfort while onboard."
        features={[
          { item: "Capacity", value: "2 Pax" },
          { item: "Sharing", value: "shareable" },
          { item: "Bed Type", value: "Twin Beds" },
          { item: "Deck", value: "Lower Deck" },
          { item: "Supplement", value: "€ 90  Per Pax Per Trip" },
        ]}
      />
    </Accordion>
  );
}
