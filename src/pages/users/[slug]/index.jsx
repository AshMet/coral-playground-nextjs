/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Text,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
// import { useRouter } from "next/router";
// import { NextSeo } from "next-seo";
// import { usePostHog } from "posthog-js/react";
// import { useEffect, useState } from "react";

import { supabase } from "../../api/index";
import Card from "components/card/Card";
import DiverReviews from "components/pages/profile/DiverReviews";
import ProfileInfo from "components/pages/profile/ProfileInfo";
import DivingLayout from "layouts/DivingLayout";

export default function DiveCentre({ profile }) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  // const router = useRouter();
  // const { slug } = router.query;
  // const posthog = usePostHog();

  // useEffect(() => {
  //   posthog.capture("$pageview", {
  //     "Dive Centre": diveCentre.name,
  //     City: diveCentre.city,
  //     Country: diveCentre.country,
  //   });
  // }, []);

  return (
    <>
      {/* <NextSeo
        title={`Dive with ${diveCentre.name} in ${diveCentre.city}`}
        description={`Book your next dive trip with ${diveCentre.name} and explore the wonders of the underwater world near ${diveCentre.city} and beyond!`}
        canonical={`https://www.coralplayground.com/dive_centres/${diveCentre.slug}`}
        openGraph={{
          type: "website",
          title: `Dive with ${diveCentre.name} in ${diveCentre.country}`,
          description: `Book your next dive trip with ${diveCentre.name} and explore the wonders of the underwater world near ${diveCentre.city} and beyond!`,
          url: `https://www.coralplayground.com/dive_centres/${diveCentre.slug}`,
          images: [
            {
              url: diveCentre.coverPhotoUrl,
              width: 1200,
              height: 630,
              alt: `Dive Centre Cover Photo - ${diveCentre.name}`,
            },
          ],
        }}
      /> */}
      <Box maxW="100%">
        <Grid
          maxW="100%"
          display={{ base: "block", lg: "grid" }}
          gridTemplateColumns="1.7fr 1fr"
        >
          <Box
            gridArea="1 / 1 / 2 / 2"
            me={{ lg: "20px" }}
            mb={{ base: "20px", lg: "0px" }}
          >
            <Card mb="20px" align="center">
              <Image
                src="/img/nfts/NftBanner1.jpg"
                borderRadius="16px"
                layout="fill"
              />
              <Avatar
                mx="auto"
                src={
                  profile?.avatarUrl ||
                  `https://api.dicebear.com/7.x/miniavs/svg?seed=${profile?.username}`
                }
                h="87px"
                w="87px"
                mt="-43px"
                mb="15px"
              />
              <Text
                fontSize="2xl"
                textColor={textColorPrimary}
                fontWeight="700"
              >
                {profile?.username}
              </Text>
              <Flex align="center" mx="auto" px="15px" mb={5}>
                <Text
                  me="4px"
                  color={textColorSecondary}
                  fontSize="sm"
                  fontWeight="400"
                  lineHeight="100%"
                >
                  Account type:
                </Text>
                <Text
                  ml={3}
                  display="flex"
                  textColor={textColorPrimary}
                  color={textColorPrimary}
                  alignItems="center"
                >
                  {profile?.userRole === "business" ? "Business" : "Diver"}
                </Text>
              </Flex>
            </Card>
            <ProfileInfo profile={profile} />
          </Box>

          <Box gridArea="1 / 2 / 2 / 3">
            <DiverReviews commentRecipientId={profile?.id} />
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const { data: profile } = await supabase
    .from("user_profiles_view")
    .select("*")
    .eq("username", slug)
    .single();

  // console.log("profile", profile);

  // const { data } = await supabase
  //   .from("user_profiles_view")
  //   .select("*")
  //   .eq("id", userId); // Need to get user avatar from url context

  return {
    props: {
      profile,
    },
  };
}

DiveCentre.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
