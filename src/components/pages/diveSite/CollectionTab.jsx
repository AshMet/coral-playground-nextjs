/* eslint-disable react/prop-types */
import {
  Text,
  useColorModeValue,
  SimpleGrid,
  Box,
  VStack,
} from "@chakra-ui/react";

import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";

export default function CollectionTab({ collection, folderUrl }) {
  const iconColor = useColorModeValue(
    "",
    "invert(70%) sepia(28%) saturate(824%) hue-rotate(210deg) brightness(110%) contrast(96%)"
  );
  return (
    <Box gridArea="1 / 2 / 2 / 3">
      <SimpleGrid mt="20px" columns="3" gap="20px" mb="20px">
        {collection?.map((item) => {
          return (
            <Card p={{ base: "28px", md: "50px" }} bg="navy.900">
              <VStack>
                <Image
                  src={`${folderUrl}/${item
                    .toLowerCase()
                    .replaceAll(" ", "_")}.svg`}
                  width="100%"
                  height="40px"
                  borderRadius="15px"
                  filter={iconColor}
                />
                <Text color="purple.200">{item}</Text>
              </VStack>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
