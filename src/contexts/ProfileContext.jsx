/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import { useToast } from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createContext, useState, useEffect } from "react";

import AlertPopup from "components/alerts/AlertPopup";
import * as gtag from "lib/data/gtag";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [profileLoading, setProfileLoading] = useState(true);
  const [diveCentreLoading, setDiveCentreLoading] = useState();
  const [username, setUsername] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [ownerDiveCentre, setOwnerDiveCentre] = useState(true);
  const toast = useToast();

  async function getProfile() {
    try {
      setProfileLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
        // setAvatarUrl(`${data.avatar_url}?token=${session.access_token}`);
      }
    } catch (error) {
      // toast({
      //   position: "top",
      //   render: () => (
      //     <AlertPopup type="danger" text="Error loading user data!" />
      //   ),
      // });
    } finally {
      setProfileLoading(false);
    }
  }

  async function updateProfile(newUsername, newAvatarUrl) {
    try {
      setProfileLoading(true);

      const updates = {
        id: user.id,
        username: newUsername || username,
        avatar_url: newAvatarUrl || avatarUrl,
        // avatar_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarUrl}`,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;

      if (newUsername) setUsername(newUsername);
      if (newAvatarUrl) setAvatarUrl(newAvatarUrl);

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
      gtag.event({
        action: "update-profile",
        category: "button",
        label: "Profile",
        // value: newItem.title,
      });
    } catch (error) {
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
        action: "update-profile",
        category: "button",
        label: "Profile",
        // value: newItem.title,
      });
    } finally {
      setProfileLoading(false);
    }
  }

  async function getOwnerDiveCentre() {
    try {
      setDiveCentreLoading(true);

      const {
        data: diveCentre,
        error,
        status,
      } = await supabase
        .from("dive_centres")
        .select("*")
        .eq("owner_id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      // console.log("centre", diveCentre);
      if (diveCentre) {
        setOwnerDiveCentre(diveCentre);
      }
    } catch (error) {
      // console.log(error);
    } finally {
      setDiveCentreLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
    getOwnerDiveCentre();
  }, [user]);

  // useEffect(() => {
  //   updateProfile();
  // }, [avatarUrl]);

  // Need to figure out how to use useMemo for this
  // const profileValue = useMemo(
  //   () => ({
  //     username,
  //     setUsername,
  //     avatarUrl,
  //     setAvatarUrl,
  //     updateProfile,
  //     profileLoading,
  //   }),
  //   []
  // );

  return (
    <ProfileContext.Provider
      value={{
        username,
        setUsername,
        avatarUrl,
        setAvatarUrl,
        updateProfile,
        profileLoading,
        diveCentreLoading,
        ownerDiveCentre,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
