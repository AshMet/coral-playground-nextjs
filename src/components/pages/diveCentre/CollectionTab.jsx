/* eslint-disable no-plusplus */
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

export default function CollectionTab({
  collection,
  folderUrl,
  extension,
  ...rest
}) {
  const iconColor = useColorModeValue(
    "",
    "invert(100%) sepia(0%) saturate(2%) hue-rotate(142deg) brightness(105%) contrast(101%)"
  );
  const bgColor = useColorModeValue("white", "navy.900");

  const titleCase = (str) => {
    const splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
  };

  return (
    <Box gridArea="1 / 2 / 2 / 3">
      <SimpleGrid mt="20px" columns={{ sm: 2, md: 4 }} gap="20px" mb="20px">
        {collection?.map((item) => {
          return (
            <Card
              p={{ base: "14px", md: "25px" }}
              bg={bgColor}
              transition="0.2s ease-out"
              _hover={{
                boxShadow: "0.1em 0.1em 3em rgba(0,0,0,0.3)",
                zIndex: 10,
                transform: "scale(1.05)",
              }}
              {...rest}
            >
              <VStack>
                <Image
                  src={`${folderUrl}/${item
                    .toLowerCase()
                    .replaceAll(" ", "-")}.${extension || "svg"}`}
                  width="100%"
                  height="50px"
                  borderRadius="15px"
                  filter={extension === "svg" ? iconColor : ""}
                />
                <Text>{titleCase(item)}</Text>
              </VStack>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
