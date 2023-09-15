/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { Flex } from "@chakra-ui/react";

import "mapbox-gl/dist/mapbox-gl.css";
import MapBase from "components/maps/MapBase";

export default function MapHero(props) {
  const { diveSites, diveCentres } = props;

  return (
    <Flex
      w="100%"
      direction={{ base: "column" }}
      // pt={{ base: "180px", md: "200px", xl: "100px" }}
      overflow="hidden"
      bgSize="cover"
      position="relative"
      h={{ sm: "75vh", lg: "100vh" }}
    >
      <MapBase
        diveSites={diveSites}
        diveCentres={diveCentres}
        h="100vh"
        boxShadow="dark-lg"
      />
      {/* </InnerContent> */}
      {/* <Stack
        direction="column"
        spacing={10}
        justifyContent="center"
        align="center"
        mt={{ sm: "-120px", lg: "-170px" }}
        zIndex={50}
      >
        <Box
          textAlign="center"
          justifyContent="center"
          bgColor="#2f353c69"
          py={10}
          borderRadius="2xl"
        >
          <Text
            as="h1"
            fontSize={{ sm: "3xl", lg: "5xl" }}
            color="white"
            lineHeight={1}
            fontWeight="bold"
            mx={{ sm: "10px", lg: "100px" }}
          >
            Book Your Next
            <chakra.span
              bgGradient="linear(to-br, brand.100, red.400)"
              bgClip="text"
            >
              {" "}
              Red Sea{" "}
            </chakra.span>{" "}
            Diving Adventure
          </Text>
        </Box>
      </Stack> */}
    </Flex>
  );
}
