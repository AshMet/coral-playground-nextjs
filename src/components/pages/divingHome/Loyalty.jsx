import { Flex, Box, Icon, Text } from "@chakra-ui/react";
import { HiBadgeCheck } from "react-icons/hi";

// import Image from "../actions/NextChakraImg";
// import { HSeparator } from "components/separator/Separator";
// import * as gtag from "lib/data/gtag";

export default function Footer() {
  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: "column",
      }}
      alignItems="start"
      justifyContent="space-between"
      pb="30px"
      position="relative"
      // backgroundImage="/img/diving/footer_bg.jpeg"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="left"
      background
    >
      <Flex
        px={{
          base: "20px",
          xl: "unset",
        }}
        bg="linear-gradient(180deg, #FC466B 0%, #3F5EFB 100%)"
        w="100%"
        bgPosition="center"
        h={{ base: "400px", lg: "250px" }}
        bgSize="cover"
      >
        <Flex
          my="auto"
          align={{ base: "start", lg: "center" }}
          w="100%"
          maxW="1170px"
          mx="auto"
          justifyContent="space-between"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >
          <Flex
            flexDirection={{
              base: "column",
              lg: "row",
            }}
          >
            <Icon
              me={{ base: "0px", lg: "40px" }}
              as={HiBadgeCheck}
              color="white"
              w="80px"
              h="80px"
            />
            <Box>
              <Text
                fontSize={{ base: "22px", md: "30px" }}
                color="white"
                fontWeight="700"
              >
                Introducing Egypt&apos;s First Scuba Loyalty Program
              </Text>
              <Text color="white" fontSize="xl" w="100%" mb="20px">
                <Text
                  color="white"
                  as="span"
                  fontWeight="700"
                  mb={10}
                  fontSize={25}
                >
                  It&apos;s simple, book 7 dives with us, and get the next dive
                  FREE!{" "}
                </Text>
                <Text color="white" mt={5} fontSize="xl" as="span">
                  Our points never expire, so you can use them on your next
                  trip, and will be made available to all countries we oprate in
                  as we expand.
                </Text>
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
