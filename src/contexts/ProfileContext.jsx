/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-throw-literal */
/* eslint-disable react-hooks/exhaustive-deps */
import { useToast } from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { usePostHog } from "posthog-js/react";
import { createContext, useState, useEffect } from "react";

import AlertPopup from "components/alerts/AlertPopup";
// import * as gtag from "lib/data/gtag";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const toast = useToast();
  const posthog = usePostHog();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState("");
  const { username, avatarUrl, firstName, lastName, divingCert, bio } = profile;

  // async function getOwnerDiveCentre() {
  //   setLoading(true);
  //   const {
  //     data: diveCentre,
  //     error,
  //     status,
  //   } = await supabase
  //     .from("dive_centres_view")
  //     .select("*")
  //     .eq("ownerId", user.id)
  //     .single();

  //   if (error && status !== 406) {
  //     // console.log(error);
  //     throw error;
  //   }
  //   if (diveCentre) {
  //     setOwnerDiveCentre(diveCentre);
  //     setLoading(false);
  //   }
  // }

  useEffect(() => {
    if (!user) return null;
    const getProfile = async () => {
      setLoading(true);
      const { data, error, status } = await supabase
        .from("user_profiles_view")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        // console.log(error);
        throw error;
      }
      if (data) {
        setProfile(data);
        setLoading(false);
      }
    };
    getProfile();
  }, [user]);

  const updateProfile = async () => {
    // Start Spinner
    setLoading(true);
    // Get Profile Data
    const { data, error } = await supabase.auth.updateUser({
      data: {
        username,
        bio,
        avatar_url: avatarUrl,
        first_name: firstName,
        last_name: lastName,
        certification: divingCert,
      },
    });
    // Alert & Analytics for failed load
    if (error) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="danger"
            text="Profile Update Failed!"
            subtext={error.message}
          />
        ),
      });
      // gtag.event({
      //   action: "update-profile-failed",
      //   category: "button",
      //   label: "Profile",
      //   // value: newItem.title,
      // });
      posthog.capture("Profile Update Failed");
    } else if (data) {
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
      // gtag.event({
      //   action: "update-profile-success",
      //   category: "button",
      //   label: "Profile",
      //   // value: newItem.title,
      // });
      posthog.capture("Profile Updated", {
        $set: {
          Username: !!data.username,
          Bio: !!data.bio,
          Avatar: !!data.avatar_url,
          "First Name": !!data.first_name,
          "Last Name": !!data.last_name,
          Certification: data.certification,
        },
      });
    }
    // Stop Spinner
    setLoading(false);
  };

  // Need to figure out how to use useMemo for this
  // const profileValue = useMemo(
  //   () => ({
  //     username,
  //     setUsername,
  //     avatarUrl,
  //     setAvatarUrl,
  //     updateProfile,
  //     loading,
  //     loading,
  //     ownerDiveCentre,
  //   }),
  //   [user]
  // );

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        updateProfile,
        loading,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
