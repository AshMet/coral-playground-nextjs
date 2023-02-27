/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useContext } from "react";

import Banner from "components/pages/profile/Banner";
import DiveCentreHub from "components/pages/profile/DiveCentreHub";
import Info from "components/pages/profile/Info";
import UserOrders from "components/pages/profile/UserOrders";
import { ProfileContext } from "contexts/ProfileContext";

export default function Profile({ session }) {
  const { profile } = useContext(ProfileContext);

  return (
    <Box pt={{ sm: "60px", xl: "100px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, lg: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        {/* Column Left */}
        <Flex direction="column">
          <Banner uid={session.user.id} />
          <Info />
        </Flex>
        {/* Column Right */}
        <Flex direction="column">
          {profile.userRole === "dive_centre_owner" ? (
            <>
              <Text fontSize="xl" fontWeight="bold" mb={5}>
                Manage your business
              </Text>
              <DiveCentreHub />
            </>
          ) : (
            <>
              <Text fontSize="xl" fontWeight="bold" mb={5}>
                Current Orders
              </Text>
              <UserOrders />
            </>
          )}
          {/* <Socials />
          <Password /> */}
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
