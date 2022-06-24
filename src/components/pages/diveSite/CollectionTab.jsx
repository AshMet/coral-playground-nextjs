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
    "invert(100%) sepia(0%) saturate(2%) hue-rotate(142deg) brightness(105%) contrast(101%)"
  );
  const bgColor = useColorModeValue("", "navy.900");
  return (
    <Box gridArea="1 / 2 / 2 / 3">
      <SimpleGrid mt="20px" columns={{ sm: 2, md: 3 }} gap="20px" mb="20px">
        {collection?.map((item) => {
          return (
            <Card p={{ base: "28px", md: "50px" }} bg={bgColor}>
              <VStack>
                <Image
                  src={`${folderUrl}/${item
                    .toLowerCase()
                    .replaceAll(" ", "_")}.svg`}
                  width="100%"
                  height="50px"
                  borderRadius="15px"
                  filter={iconColor}
                />
                <Text>{item}</Text>
              </VStack>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
