/* eslint-disable react/prop-types */
// Chakra imports
import { useColorModeValue, useToast } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";

import AlertPopup from "components/alerts/AlertPopup";
import SwitchField from "components/fields/SwitchField";
// import * as gtag from "lib/data/gtag";
// Assets

export default function TripActiveToggle(props) {
  const { diveTrip, currentlyActive } = props;
  const [active, setActive] = useState(currentlyActive);
  const textColorActive = useColorModeValue("green.600", "green.400");
  const textColorInactive = useColorModeValue("red.700", "red.400");
  const supabase = useSupabaseClient();
  const toast = useToast();
  const posthog = usePostHog();

  const updateStatus = async (newStatus) => {
    await setActive(newStatus);
    const { data } = await supabase
      .from("dive_trips")
      .update({ active: newStatus })
      .select()
      .eq("id", diveTrip.id);
    if (data) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="success"
            text="Dive Trip Updated"
            subtext={`Status: ${newStatus ? "Active" : "Not Active"}`}
          />
        ),
      });
      // gtag.event({
      //   action: "update-dive-trip-success",
      //   category: "button",
      //   label: "Dive Trip",
      //   // value: newItem.title,
      // });
      posthog.capture("Dive Trip Updated", {
        "Dive Trip": data.name,
        Status: data.active ? "Active" : "Inactive",
      });
    }
    setActive(newStatus);
  };
  useEffect(() => {}, [active]);

  return (
    <SwitchField
      id="1"
      isChecked={active}
      onChange={() => updateStatus(!active)}
      // onChange={() => setActive(!active)}
      // label={`Status: ${active ? "Active" : "Not Active"}`}
      labelColor={active ? textColorActive : textColorInactive}
    />
  );
}
