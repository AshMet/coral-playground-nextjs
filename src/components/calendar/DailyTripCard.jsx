/* eslint-disable react/prop-types */
// Chakra imports
import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { IoMdTime } from "react-icons/io";

import AlertPopup from "components/alerts/AlertPopup";
import SwitchField from "components/fields/SwitchField";
import * as gtag from "lib/data/gtag";
// Assets

export default function DailyTripCard(props) {
  const { diveTrip, ...rest } = props;
  const [visible, setVisible] = useState(diveTrip.visible);
  // Chakra Color Mode
  const miniCardNonCurrent = useColorModeValue("gray.200", "gray.700");
  const textNonCurrent = useColorModeValue("secondaryGray.900", "white");
  const textSecondaryNonCurrent = useColorModeValue("gray.500", "gray.200");
  const textColorActive = useColorModeValue("green.600", "green.400");
  const textColorInactive = useColorModeValue("red.700", "red.400");
  const supabase = useSupabaseClient();
  const toast = useToast();

  const updateStatus = async (newStatus) => {
    const { data } = await supabase
      .from("dive_trips")
      .update({ visible: newStatus })
      .select()
      .eq("id", diveTrip.id);
    if (data) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="success"
            text="Dive Centre Updated"
            subtext={`Status: ${newStatus ? "Active" : "Not Active"}`}
          />
        ),
      });
      gtag.event({
        action: "update-dive-centre-success",
        category: "button",
        label: "Dive Centre",
        // value: newItem.title,
      });
    }
    setVisible(newStatus);
  };
  useEffect(() => {}, [visible]);

  return (
    <Flex
      align="center"
      p="6px"
      borderRadius="20px"
      bg={miniCardNonCurrent}
      {...rest}
    >
      <Box ml={3}>
        <Text fontSize="lg" fontWeight="700" color={textNonCurrent}>
          {diveTrip.name}
        </Text>
        <Flex align="center">
          <Icon
            me="8px"
            as={IoMdTime}
            w="16px"
            h="16px"
            color={textSecondaryNonCurrent}
          />
          <Text fontSize="sm" fontWeight="500" color={textSecondaryNonCurrent}>
            {`${diveTrip.start_time?.split(":")[0]}:${
              diveTrip.start_time?.split(":")[1]
            }`}
          </Text>
        </Flex>
      </Box>
      <Box m={0}>
        <SwitchField
          id="1"
          isChecked={visible}
          onChange={() => updateStatus(!visible)}
          // onChange={() => setActive(!active)}
          // label={`Status: ${visible ? "Active" : "Not Active"}`}
          labelColor={visible ? textColorActive : textColorInactive}
        />
      </Box>
    </Flex>
  );
}
