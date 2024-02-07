/* eslint-disable react/prop-types */
// chakra imports
import { Box, Flex, Stack } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";

import adminRoutes from "../../../routes_admin";
import businessRoutes from "../../../routes_business";
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";

// FUNCTIONS

function SidebarContent(props) {
  const { routes, mini, hovered } = props;
  const user = useUser();

  // SIDEBAR
  return (
    <Flex
      direction="column"
      height="100%"
      pt="25px"
      borderRadius="30px"
      align="center"
    >
      <Brand mini={mini} hovered={hovered} />
      <Stack direction="column" mb="auto" mt="8px">
        <Box
          ps={mini === false || hovered === true ? "20px" : "16px"}
          pe={{ md: "16px", "2xl": "1px" }}
          ms={mini && hovered === false ? "-16px" : "unset"}
        >
          <Links mini={mini} hovered={hovered} routes={routes} />
          {user?.user_metadata.user_role === "business" && (
            <Links mini={mini} hovered={hovered} routes={businessRoutes} />
          )}
          {user?.app_metadata.user_role === "ADMIN" && (
            <Links mini={mini} hovered={hovered} routes={adminRoutes} />
          )}
          {/* <AdminLinks /> */}
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
