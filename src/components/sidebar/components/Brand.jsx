/* eslint-disable @typescript-eslint/no-unused-vars */
// Chakra imports
import { Flex, Box, useColorModeValue } from "@chakra-ui/react";
// import React from "react";
// Custom components
// import { HorizonLogo } from "components/icons/Icons";
import Image from "next/image";
import Link from "next/link";

import { HSeparator } from "components/separator/Separator";
import { useUser } from "@supabase/auth-helpers-react";
// import Image from "../../actions/NextChakraImg";

export function SidebarBrand() {
  const user = useUser();
  //   Chakra color mode
  const logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align="start" direction="column">
      <Link href={user ? "/users/me" : "/"}>
        <Box ml="30px" mb="20px" _hover={{ cursor: "pointer" }}>
          <Image src="/svg/coral-logo.svg" width="200px" height="45px" />
        </Box>
      </Link>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
