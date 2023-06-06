/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
// chakra imports
import { Box, Flex, Stack } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";

import adminRoutes from "../../../routes_admin";
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";

// import AdminLinks from "./AdminLinks";
// import SidebarCard from "components/sidebar/components/SidebarCard";

// FUNCTIONS

function SidebarContent(props) {
  const { routes } = props;
  const user = useUser();
  // const {
  //   isAuthenticated,
  //   nickname,
  //   setNickname,
  //   username,
  //   handleSetUsername,
  // } = useContext(CoralPgContext);

  // const textColor = useColorModeValue("navy.700", "white");
  // const avatar4 = `https://avatars.dicebear.com/api/miniavs/${username}.svg`;
  // SIDEBAR
  return (
    <Flex
      direction="column"
      minH="100%"
      height="max-content"
      pt="25px"
      borderRadius="30px"
    >
      <Brand />
      <Stack direction="column" mb="auto" mt="8px">
        <Box ps="20px" pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
          {user?.user_metadata.user_role === "business" && (
            <Links routes={adminRoutes} />
          )}
          {/* <AdminLinks /> */}
        </Box>
      </Stack>

      {/* <Box
            ps="20px"
            pe={{ md: "16px", "2xl": "0px" }}
            mt="60px"
            borderRadius="30px"
          >
            <SidebarCard />
          </Box> */}
      {/* {isAuthenticated && (
        <Flex mt="75px" mb="56px" justifyContent="center" alignItems="center">
          <Avatar h="48px" w="48px" src={avatar4} me="20px" />
          <Box>
            {username ? (
              <>
                <Text color={textColor} fontSize="md" fontWeight="700">
                  {`@${username}`}
                </Text>
                <Text color="secondaryGray.600" fontSize="sm" fontWeight="400">
                  Pro Diver
                </Text>
              </>
            ) : (
              <>
                <Box>
                  <Input
                    type="text"
                    placeholder="Username...."
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </Box>
                <Button
                  colorScheme="purple"
                  size="sm"
                  borderRadius="58px"
                  mt="10px"
                  onClick={handleSetUsername}
                >
                  Set Nickname
                </Button>
              </>
            )}
          </Box>
        </Flex>
      )} */}
    </Flex>
  );
}

export default SidebarContent;
