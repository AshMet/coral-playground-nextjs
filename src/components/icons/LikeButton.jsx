/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import { Button, Icon } from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

function LikeButton(props) {
  const { diveSiteId, diveCentreId, override } = props;
  const [isLiked, setIsLiked] = useState(false);
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  async function checkIfLiked() {
    if (diveSiteId) {
      const { data: siteLiked } = await supabaseClient
        .from("site_likes")
        .select("*")
        .eq("user_id", user.id)
        .eq("dive_site_id", diveSiteId);
      setIsLiked(siteLiked.length > 0);
    } else if (diveCentreId) {
      const { data: centreLiked } = await supabaseClient
        .from("centre_likes")
        .select("*")
        .eq("user_id", user.id)
        .eq("dive_centre_id", diveCentreId);
      setIsLiked(centreLiked.length > 0);
    } else if (override) {
      setIsLiked(override === "ON");
    }
  }

  async function Like() {
    if (!user) return;
    if (diveSiteId) {
      const { data: siteLike } = await supabaseClient
        .from("site_likes")
        .insert([{ user_id: user.id, dive_site_id: diveSiteId }])
        .select();
      siteLike && setIsLiked(true);
    } else if (diveCentreId) {
      const { data: centreLike } = await supabaseClient
        .from("centre_likes")
        .insert([{ user_id: user.id, dive_centre_id: diveCentreId }])
        .select();
      centreLike && setIsLiked(true);
    }
  }

  async function unLike() {
    if (diveSiteId) {
      await supabaseClient
        .from("site_likes")
        .delete()
        .eq("user_id", user.id)
        .eq("dive_site_id", diveSiteId);
    } else if (diveCentreId) {
      await supabaseClient
        .from("centre_likes")
        .delete()
        .eq("user_id", user.id)
        .eq("dive_centre_id", diveCentreId);
    }
    setIsLiked(false);
  }

  useEffect(() => {
    if (!user) return null;
    checkIfLiked();
  }, [user]);

  return (
    <Button
      position="absolute"
      bg="white"
      _hover={{ bg: "whiteAlpha.900" }}
      _active={{ bg: "white" }}
      _focus={{ bg: "white" }}
      p="0px !important"
      top="14px"
      right="14px"
      borderRadius="50%"
      minW="36px"
      h="36px"
      onClick={() => {
        !override ? (isLiked ? unLike() : Like()) : null;
      }}
      // disabled={override}
    >
      <Icon
        transition="0.2s linear"
        w="20px"
        h="20px"
        as={isLiked ? IoHeart : IoHeartOutline}
        color="brand.100"
      />
    </Button>
  );
}

export default LikeButton;
