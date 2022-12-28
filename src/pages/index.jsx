import { Box, Flex } from "@chakra-ui/react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { NextSeo } from "next-seo";

import Profile from "components/pages/profile/Profile";
import CenteredAuth from "layouts/auth/types/Centered";
import DivingLayout from "layouts/DivingLayout";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();

  // console.log(session);

  return (
    <Box>
      {!session ? (
        <>
          <NextSeo
            title="Sign In"
            description="Log in to start enjoying all the features of Coral Playground"
          />
          <CenteredAuth
            image="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
            cardTop={{ base: "180px", md: "25vh" }}
            cardBottom={{ base: "50px", lg: "auto" }}
            mx="0px"
            padding={{ sm: "50px 50px 100px 50px" }} // Need to confirm this should stay for login
          >
            <Flex
              maxW={{ base: "100%", md: "max-content" }}
              w="100%"
              minW="400px"
              mx={{ base: "auto", lg: "0px" }}
              me="auto"
              justifyContent="center"
              px={{ base: "20px", md: "0px" }}
              flexDirection="column"
            >
              <Auth
                supabaseClient={supabase}
                appearance={{ theme: ThemeSupa }}
                theme="dark"
              />
            </Flex>
          </CenteredAuth>
        </>
      ) : (
        <>
          <NextSeo
            title="User Account"
            description="View upcoming dives and bookings"
          />
          <DivingLayout>
            <Profile session={session} />
          </DivingLayout>
        </>
      )}
    </Box>
  );
}
