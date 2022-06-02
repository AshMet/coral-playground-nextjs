/* eslint-disable react/prop-types */
// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";

// Custom components
import Card from "components/card/Card";

import Trait from "./Trait";

// Assets
export default function Traits(props) {
  const { metadata, description } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  return (
    <Card mb={{ base: "0px", lg: "20px" }}>
      <Text
        color={textColorPrimary}
        fontWeight="bold"
        fontSize="2xl"
        mt="10px"
        mb="4px"
      >
        Traits
      </Text>
      {description}
      <SimpleGrid columns="2" gap="20px" mt="20px">
        {metadata &&
          metadata.map((attr) => (
            <Trait
              key={attr.trait_type}
              title={attr.trait_type}
              value={attr.value}
            />
          ))}
      </SimpleGrid>
    </Card>
  );
}
