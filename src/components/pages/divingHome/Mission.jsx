/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Button,
  Box,
  Flex,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets

// import image1 from "assets/img/free/overview/image-1.png";
// import image2 from "assets/img/free/overview/image-2.png";
// import image3 from "assets/img/free/overview/image-3.png";
// import image4 from "assets/img/free/overview/image-4.png";
// import image5 from "assets/img/free/overview/image-5.png";
// import image6 from "assets/img/free/overview/image-6.png";
// import image from "assets/img/free/overview/image.png";

// Custom components
// import PageCard from "components/pages/divingHome/PageCard";
// import Image from "components/actions/NextChakraImg";
import Image from "../../actions/NextChakraImg";
import InnerContent from "layouts/InnerContent";

export default function Mission() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  // const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  const endGradient = useColorModeValue(
    "linear-gradient(360deg, #F7FAFC 17.92%, rgba(247, 250, 252, 0) 100%)",
    "linear-gradient(360deg, #172041 17.92%, rgba(23, 32, 65, 0) 54.26%)"
  );
  return (
    <Flex
      w="100%"
      direction={{ base: "column" }}
      mt="-50px"
      pt={{ base: "180px", md: "200px", xl: "100px" }}
      overflow="hidden"
      bgSize="cover"
      position="relative"
    >
      <InnerContent px={{ base: "20px", md: "40px", xl: "0px" }}>
        <Flex direction="column" width="stretch">
          <Flex
            direction="column"
            mx="auto"
            mb="40px"
            maxW={{ base: "100%", md: "100%", lg: "80%", xl: "70%" }}
            textAlign="center"
          >
            <Text
              fontWeight="700"
              letterSpacing="2px"
              bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
              bgClip="text"
              fontSize="sm"
              w="100%"
              mb="10px"
            >
              OUR MISSION
            </Text>
            <Text
              color={textColor}
              fontWeight="800"
              fontSize={{ base: "28px", md: "40px", lg: "48px" }}
              lineHeight={{ base: "38px", md: "50px", lg: "58px" }}
              mb="20px"
            >
              Improve your Diving Experience
            </Text>
            <Text color={textColor} fontSize="lg" w="100%" mb="20px">
              Coral Playground is your gateway to the largest collection of
              dives in Egypt, operated by a network of the highest quality dive
              centres, guides and instructors.{" "}
              <Text color={textColor} as="span" fontWeight="700">
                Our goal is to make sure you can book the best dive vacation of
                your life as quickly and easily as possible with complete peace
                of mind.
              </Text>
            </Text>
          </Flex>
        </Flex>
        <Flex
          mb="90px"
          justify="center"
          // w={{ base: "72%", md: "90%" }}
          // flexWrap="wrap"
        >
          <Image
            src="/img/diving/egypt_dive_map2.jpg"
            // layout="fill"
            width="1000"
            height="500"
          />
          {/* <PageCard
            mb="20px"
            me={{ base: "0px", md: "20px" }}
            title="Dive Sites"
            // image={image}
            link="https://horizon-ui.com/horizon-ui-chakra/#/admin/default"
          />
          <PageCard
            mb="20px"
            me={{ base: "0px", xl: "20px" }}
            title="Dive Centres"
            // image={image1}
            link="https://horizon-ui.com/horizon-ui-chakra/#/admin/nft-marketplace"
          /> */}
        </Flex>
        <Link href="/diving/map">
          <Button
            h="50px"
            borderRadius="12px"
            variant="darkBrand"
            fontSize="sm"
          >
            View our interactive map
          </Button>
        </Link>
      </InnerContent>
      <Box bg={endGradient} h="140px" w="100%" />
    </Flex>
  );
}
