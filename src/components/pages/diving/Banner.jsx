/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react/prop-types */
import { Flex, Text, Box } from "@chakra-ui/react";

import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
import { VSeparator } from "components/separator/Separator";

// Assets
// import InvoiceBg from "assets/img/account/InvoiceBg.png";

export default function Banner(props) {
  const { orderId } = props;

  return (
    <Card
      // backgroundImage="/img/nfts/NftBanner1.jpg"
      bg="linear-gradient(179.78deg, #7A64FF 0.23%, #FF508B 66.58%, #FD6D53 99.75%, #FD6D53 99.75%)"
      backgroundRepeat="no-repeat"
      bgSize="cover"
      bgPosition="10%"
      px={{ base: "20px", md: "60px" }}
      pt={{ base: "20px", md: "35px" }}
      pb={{ sm: "120px", md: "0px" }}
    >
      <Flex
        mb={{ base: "0px", md: "50px" }}
        direction={{ base: "column", md: "row" }}
      >
        <Flex
          direction="column"
          color="white"
          h="100%"
          w="100%"
          mb={{ base: "20px", md: "0px" }}
        >
          <Text
            mt={{ base: "10px", md: "0px" }}
            fontSize={{ base: "2xl", md: "32px", lg: "44px", xl: "44px" }}
            fontWeight="bold"
            casing="uppercase"
          >
            {`Booking Ref: ${orderId.split("-").pop()}`}
          </Text>
        </Flex>
        <VSeparator
          bg="whiteAlpha.300"
          mx={{ base: "10px", md: "40px" }}
          display={{ base: "none", md: "flex" }}
        />
        <Flex direction="column" color="white" h="100%" w="100%">
          <Box ml="-10px">
            <Image
              src="/svg/coral-logo.svg"
              width="200px"
              height="45px"
              filter="invert(0%) sepia(0%) saturate(100%) hue-rotate(268deg) brightness(300%) contrast(107%)"
            />
          </Box>
          <Text
            fontSize={{ base: "md", md: "xl" }}
            mt={{ base: "10px", md: "10px" }}
            fontWeight="regular"
          >
            Red Sea Touristic Promenade
          </Text>
          <Text fontSize={{ base: "md", md: "xl" }} fontWeight="regular">
            Hurghada, Egypt
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
