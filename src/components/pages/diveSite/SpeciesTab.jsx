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

export default function SpeciesTab({ collection, ...rest }) {
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
                transform: "scale(2.2)",
              }}
              {...rest}
            >
              <VStack>
                {item.specie.cover_photo && (
                  <Image
                    src={item.specie.cover_photo}
                    width="100%"
                    height="50px"
                    borderRadius="15px"
                  />
                )}
                <Text>{titleCase(item.specie.name)}</Text>
              </VStack>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
