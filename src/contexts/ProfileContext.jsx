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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { data, error } = await supabase.from("profiles").upsert({
    //   id: user.id,
    //   username,
    //   bio,
    //   avatar_url: avatarUrl,
    //   first_name: firstName,
    //   last_name: lastName,
    //   certification: divingCert,
    //   // avatar_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarUrl}`,
    //   updated_at: new Date().toISOString(),
    // });
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
            // subtext="View Shopping Cart to complete your order"
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
        email: user.email,
        username: !!data.username,
        bio: !!data.bio,
        avatar_url: !!data.avatar_url,
        first_name: !!data.first_name,
        last_name: !!data.last_name,
        certification: data.certification,
      });
    }
    // Stop Spinner
    setLoading(false);
  };

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
  //     // toast({
  //     //   position: "top",
  //     //   render: () => (
  //     //     <AlertPopup type="danger" text="Error loading user data!" />
  //     //   ),
  //     // });
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // async function updateProfile(newUsername, newAvatarUrl) {
  //   try {
  //     setLoading(true);

  //     const updates = {
  //       id: user.id,
  //       username: newUsername || username,
  //       avatar_url: newAvatarUrl || avatarUrl,
  //       // avatar_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarUrl}`,
  //       updated_at: new Date().toISOString(),
  //     };

  //     const { error } = await supabase.from("profiles").upsert(updates);
  //     if (error) throw error;

  //     if (newUsername) setUsername(newUsername);
  //     if (newAvatarUrl) setAvatarUrl(newAvatarUrl);

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
  //   getOwnerDiveCentre();
  // }, [user]);

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
