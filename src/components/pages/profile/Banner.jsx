/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {
  Avatar,
  Button,
  Flex,
  Image,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useContext, useRef, useState } from "react";

import AlertPopup from "components/alerts/AlertPopup";
import Card from "components/card/Card";
import { ProfileContext } from "contexts/ProfileContext";
import * as gtag from "lib/data/gtag";

export default function Settings(props) {
  const { uid } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  const supabase = useSupabaseClient();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);
  const toast = useToast();
  const user = useUser();
  const { profile, setProfile, updateProfile } = useContext(ProfileContext);

  // async function downloadImage(path) {
  //   try {
  //     const { data, error } = await supabase.storage
  //       .from("avatars")
  //       .download(path);
  //     // .getPublicUrl(path);
  //     if (error) {
  //       throw error;
  //     }
  //     const url = URL.createObjectURL(data);
  //     setAvatarUrl(url);
  //   } catch (error) {
  //   }
  // }

  // useEffect(() => {
  //   updateProfile();
  // }, [profile]);

  const uploadAvatar = async (e) => {
    try {
      setUploading(true);

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = e.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;
      const newAvatarUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${filePath}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }
      setProfile({
        ...profile,
        avatarUrl: newAvatarUrl,
      });
    } catch (error) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="danger"
            text="Profile Avatar Update Failed!"
            // subtext="View Shopping Cart to complete your order"
          />
        ),
      });
      gtag.event({
        action: "update-profile",
        category: "button",
        label: "Profile",
        // value: newItem.title,
      });
    } finally {
      updateProfile();
      setUploading(false);
    }
  };

  // useEffect(() => {
  //   updateProfile();
  // }, [profile]);

  // useEffect(() => {
  //   if (avatarUrl) downloadImage(avatarUrl);
  // }, [avatarUrl]);

  return (
    <Card mb="20px" align="center">
      <Image src="/img/nfts/NftBanner1.jpg" borderRadius="16px" />
      <Avatar
        key={new Date().toUTCString}
        mx="auto"
        src={
          profile?.avatarUrl ||
          `https://avatars.dicebear.com/api/miniavs/${user.email}.svg`
        }
        h="87px"
        w="87px"
        mt="-43px"
        mb="15px"
      />
      <Text fontSize="2xl" textColor={textColorPrimary} fontWeight="700">
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
          {user.user_metadata.user_role === "dive_centre_owner"
            ? "Dive Centre Owner"
            : "Scuba Diver"}
        </Text>
      </Flex>
      <Flex width={150} direction="column" mx="auto">
        {/* <label className="button primary block" htmlFor="single">
          {uploading ? "Uploading ..." : "Upload"}
        </label> */}
        <Button onClick={() => inputRef.current.click()}>
          {uploading ? "Uploading ..." : "Upload Avatar"}
        </Button>
        <input
          name="avatarUrl"
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          width={0}
          ref={inputRef}
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </Flex>
    </Card>
  );
}
