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
  Flex,
  Text,
  Link,
  useColorModeValue,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
// Custom components
// import PageCard from "components/pages/divingHome/PageCard";
// import Image from "components/actions/NextChakraImg";
import { Parallax } from "react-scroll-parallax";

import Image from "../../actions/NextChakraImg";
import InnerContent from "layouts/InnerContent";

export default function Mission() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  // const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  return (
    <Flex
      w="100%"
      direction={{ base: "column" }}
      my="50px"
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
            <Heading
              color={textColor}
              fontWeight="800"
              fontSize={{ base: "28px", md: "40px", lg: "48px" }}
              lineHeight={{ base: "38px", md: "50px", lg: "58px" }}
              mb="20px"
            >
              Help Drive Your Business Forward
            </Heading>
            <Text color={textColor} fontSize="lg" w="100%" mb="20px">
              Join the Coral Playground community and reach a growing network of
              scuba divers worldwide! As a business partner, you&apos;ll be part
              of a trusted network of high-quality dive centers.{" "}
              <Text color={textColor} as="span" fontWeight="700">
                We make managing customers and dive trips a breeze so you can
                focus on what really matters - the diving experience. Let us
                handle the bookings and give you complete peace of mind.
              </Text>
            </Text>
          </Flex>
        </Flex>
        <Flex justify="center" direction="column">
          <Grid templateColumns="repeat(20, 1fr)" gap={0} zIndex="20">
            <GridItem colStart={7} colSpan={1}>
              <Parallax translateY={[0, 130, "easeOutExpo"]} endScroll={150}>
                <Image
                  src="/img/diving/dive_site_marker.svg"
                  width="100px"
                  height="150px"
                />
              </Parallax>
            </GridItem>
            <GridItem colStart={8} colSpan={1}>
              <Parallax translateY={[0, 170, "easeOutExpo"]} endScroll={150}>
                <Image
                  src="/img/diving/dive_site_marker.svg"
                  width="100px"
                  height="150px"
                />
              </Parallax>
            </GridItem>
            <GridItem colStart={9} colSpan={1}>
              <Parallax translateY={[0, 200, "easeOutExpo"]} endScroll={200}>
                <Image
                  src="/img/diving/dive_centre_marker.svg"
                  width="100px"
                  height="150px"
                />
              </Parallax>
            </GridItem>
          </Grid>
          <Image
            src="/img/diving/egypt_dive_map.png"
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
        <Link href="/map">
          <Button
            h="50px"
            borderRadius="12px"
            variant="darkBrand"
            fontSize="sm"
          >
            View Interactive Dive Map
          </Button>
        </Link>
      </InnerContent>
    </Flex>
  );
}
