/* eslint-disable @typescript-eslint/no-unused-vars */
// Chakra imports
import { Flex, Box, useColorModeValue } from "@chakra-ui/react";
// import React from "react";
// Custom components
// import { HorizonLogo } from "components/icons/Icons";
import Image from "next/image";

import { HSeparator } from "components/separator/Separator";
// import Image from "../../actions/NextChakraImg";

export function SidebarBrand() {
  //   Chakra color mode
  const logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="start" direction="column">
      {/* <HorizonLogo h="26px" w="175px" my="32px" color={logoColor} /> */}
      <Box ml="30px" mb="20px">
        <Image src="/svg/coral-logo.svg" width="200px" height="45px" />
      </Box>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
