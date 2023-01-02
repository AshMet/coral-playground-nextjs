/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Select,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useRef, useState } from "react";

import AlertPopup from "components/alerts/AlertPopup";
import Card from "components/card/Card";
import * as gtag from "lib/data/gtag";

export default function Settings(props) {
  const { name, avatarUrl, setAvatarUrl, banner, uid, size, onUpload } = props;
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  const supabase = useSupabaseClient();
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);
  const toast = useToast();

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      // .getPublicUrl(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      // console.log("Error downloading image: ", error);
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uid}.${fileExt}`;
      const filePath = `${fileName}`;
      // const filePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/sign/avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      // console.log("fileName", fileName);
      // console.log("filePath", filePath);

      onUpload(filePath);
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
      setUploading(false);
    }
  };

  useEffect(() => {
    if (avatarUrl) downloadImage(avatarUrl);
  }, [avatarUrl]);

  return (
    <Card mb="20px" align="center">
      <Image src={banner} borderRadius="16px" />
      <Avatar
        mx="auto"
        src={avatarUrl}
        h="87px"
        w="87px"
        mt="-43px"
        mb="15px"
      />
      <Text fontSize="2xl" textColor={textColorPrimary} fontWeight="700">
        {name}
      </Text>
      <Flex align="center" mx="auto" px="15px">
        <Text
          me="4px"
          color={textColorSecondary}
          fontSize="sm"
          fontWeight="400"
          lineHeight="100%"
        >
          Account type:
        </Text>
        <Select
          id="user_type"
          w="unset"
          variant="transparent"
          display="flex"
          textColor={textColorPrimary}
          color={textColorPrimary}
          alignItems="center"
          defaultValue="Administrator"
        >
          <option value="Administrator">Administrator</option>
          <option value="Member">Member</option>
        </Select>
      </Flex>
      <Box width={size}>
        {/* <label className="button primary block" htmlFor="single">
          {uploading ? "Uploading ..." : "Upload"}
        </label> */}
        <Button onClick={() => inputRef.current.click()}>
          {uploading ? "Uploading ..." : "Upload"}
        </Button>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          ref={inputRef}
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </Box>
    </Card>
  );
}
