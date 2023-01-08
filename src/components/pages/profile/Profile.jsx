/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
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

import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
// import { useContext } from "react";

// import AlertPopup from "components/alerts/AlertPopup";
import Banner from "components/pages/profile/Banner";
import DiveCentreHub from "components/pages/profile/DiveCentreHub";
import Info from "components/pages/profile/Info";
// import { ProfileContext } from "contexts/ProfileContext";
// import * as gtag from "lib/data/gtag";

export default function Profile({ session }) {
  // const supabase = useSupabaseClient();
  // const [loading, setLoading] = useState(true);
  // const [username, setUsername] = useState(null);
  // const [avatarUrl, setAvatarUrl] = useState(null);
  // const toast = useToast();
  // const {
  // username,
  // setUsername,
  // avatarUrl,
  // setAvatarUrl,
  //   updateProfile,
  //   profileLoading,
  // } = useContext(ProfileContext);

  // async function getProfile() {
  //   try {
  //     setLoading(true);

  //     const { data, error, status } = await supabase
  //       .from("profiles")
  //       .select(`username, avatar_url`)
  //       .eq("id", user.id)
  //       .single();

  //     if (error && status !== 406) {
  //       throw error;
  //     }

  //     if (data) {
  //       setUsername(data.username);
  //       setAvatarUrl(data.avatar_url);
  //       // setAvatarUrl(`${data.avatar_url}?token=${session.access_token}`);
  //     }
  //   } catch (error) {
  //     toast({
  //       position: "top",
  //       render: () => (
  //         <AlertPopup type="danger" text="Error loading user data!" />
  //       ),
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // async function updateProfile({ username, avatarUrl }) {
  //   try {
  //     setLoading(true);

  //     const updates = {
  //       id: user.id,
  //       username,
  //       avatar_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarUrl}`,
  //       updated_at: new Date().toISOString(),
  //     };

  //     const { error } = await supabase.from("profiles").upsert(updates);
  //     if (error) throw error;

  //     toast({
  //       position: "top",
  //       render: () => (
  //         <AlertPopup
  //           type="success"
  //           text="Profile Updated!"
  //           // subtext="View Shopping Cart to complete your order"
  //         />
  //       ),
  //     });
  //     gtag.event({
  //       action: "update-profile",
  //       category: "button",
  //       label: "Profile",
  //       // value: newItem.title,
  //     });
  //   } catch (error) {
  //     toast({
  //       position: "top",
  //       render: () => (
  //         <AlertPopup
  //           type="danger"
  //           text="Profile Update Failed!"
  //           // subtext="View Shopping Cart to complete your order"
  //         />
  //       ),
  //     });
  //     gtag.event({
  //       action: "update-profile",
  //       category: "button",
  //       label: "Profile",
  //       // value: newItem.title,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // useEffect(() => {
  //   getProfile();
  // }, [session]);

  // console.log(session);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, lg: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        {/* Column Left */}
        <Flex direction="column">
          <Banner uid={session.user.id} />
          {/* uid={user!.id} */}
          <Info
          // username={username}
          // setUsername={setUsername}
          // updateProfile={updateProfile}
          // loading={profileLoading}
          />
        </Flex>
        {/* Column Right */}
        <Flex direction="column">
          <DiveCentreHub />
          {/* <Socials />
          <Password /> */}
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
