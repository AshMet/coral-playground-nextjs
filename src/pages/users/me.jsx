/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import { Box, Flex, SimpleGrid, Text, useToast } from "@chakra-ui/react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";

import AlertPopup from "components/alerts/AlertPopup";
import Banner from "components/pages/profile/Banner";
import Info from "components/pages/profile/Info";
import UserOrders from "components/pages/profile/UserOrders";
import DivingLayout from "layouts/DivingLayout";
import * as gtag from "lib/data/gtag";

export default function Profile(props) {
  const { user } = props;
  const supabase = useSupabaseClient();
  const [profile, setProfile] = useState("");
  const toast = useToast();
  const {
    username,
    avatarUrl,
    firstName,
    lastName,
    divingCert,
    bio,
    userRole,
  } = profile;

  useEffect(() => {
    if (!user) return null;
    setProfile({
      username: user?.user_metadata.username,
      avatarUrl: user?.user_metadata.avatar_url,
      firstName: user?.user_metadata.first_name,
      lastName: user?.user_metadata.last_name,
      divingCert: user?.user_metadata.certification,
      bio: user?.user_metadata.bio,
      userRole: user?.user_metadata.user_role,
    });
  }, [user]);

  const updateProfile = async () => {
    const { error } = await supabase.auth.updateUser({
      data: {
        username,
        bio,
        avatar_url: avatarUrl,
        first_name: firstName,
        last_name: lastName,
        certification: divingCert,
      },
    });
    // Success Alert
    toast({
      position: "top",
      render: () => (
        <AlertPopup
          type="success"
          text="Profile Updated!"
          // subtext="View Shopping Cart to complete your order"
        />
      ),
    });
    // Success Analytics Tag
    gtag.event({
      action: "update-profile-success",
      category: "button",
      label: "Profile",
      // value: newItem.title,
    });
    // Alert & Analytics for failed load
    if (error) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="danger"
            text="Profile Update Failed!"
            // subtext="View Shopping Cart to complete your order"
          />
        ),
      });
      gtag.event({
        action: "update-profile-failed",
        category: "button",
        label: "Profile",
        // value: newItem.title,
      });
    }
  };

  return (
    <Box>
      <>
        <NextSeo
          title="Coral Playground | User Account"
          description="User Profile & Settings"
          canonical="https://www.coralplayground.com/"
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
        <Box pt={{ sm: "60px", xl: "100px" }}>
          <SimpleGrid
            mb="20px"
            columns={{ sm: 1, lg: 2 }}
            spacing={{ base: "20px", xl: "20px" }}
          >
            {/* Column Left */}
            <Flex direction="column">
              <Banner
                uid={user.id}
                profile={profile}
                setProfile={setProfile}
                updateProfile={updateProfile}
              />
            </Flex>
            {/* Column Right */}
            <Flex direction="column">
              <Info
                profile={profile}
                setProfile={setProfile}
                updateProfile={updateProfile}
              />
            </Flex>
          </SimpleGrid>
          <Box>
            {userRole === "dive_centre_owner" ? (
              <Text fontSize="xl" fontWeight="bold" mb={5}>
                Manage your business
              </Text>
            ) : (
              <>
                <Text fontSize="xl" fontWeight="bold" mb={5}>
                  Current Orders
                </Text>
                <UserOrders />
              </>
            )}
          </Box>
        </Box>
      </>
    </Box>
  );
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id;

  console.log("session:", session);

  const { data } = await supabase
    .from("dive_centres")
    .select("*")
    .eq("owner_id", userId)
    .single();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      session,
      user: session.user,
      data: data ?? [],
    },
  };
};

Profile.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
