/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import { NextSeo } from "next-seo";
import { useContext } from "react";

import Banner from "components/pages/profile/Banner";
import DiveCentreHub from "components/pages/profile/DiveCentreHub";
import Info from "components/pages/profile/Info";
import UserOrders from "components/pages/profile/UserOrders";
import { ProfileContext } from "contexts/ProfileContext";
import DivingLayout from "layouts/DivingLayout";
// import { supabase } from "utils/supabase";

export default function Profile() {
  const session = useSession();
  const { profile } = useContext(ProfileContext);
  // console.log("session", session);

  return (
    <Box>
      {session && (
        <>
          <NextSeo
            title="Coral Playground | User Account"
            description="User Profile & Settings"
            openGraph={{
              type: "website",
              title: "Coral Playground | User Account",
              description: "User Profile & Settings",
              url: "https://www.coralplayground.com/",
              images: [
                {
                  url: "https://www.coralplayground.com/svg/coral-logo.svg",
                  width: 800,
                  height: 400,
                  alt: "Coral Playground Logo",
                },
              ],
            }}
          />
          <DivingLayout>
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
          </DivingLayout>
        </>
      )}
    </Box>
  );
}

// export async function getStaticProps() {
//   const { data } = await supabase
//     .from("dive_sites")
//     .select(`id, name, latitude, longitude, dive_map`)
//     .neq("dive_map", null);
//   return { props: { data }, revalidate: 86400 };
// }
