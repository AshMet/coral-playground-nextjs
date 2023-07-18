/* eslint-disable react/prop-types */
import {
  Flex,
  SimpleGrid,
  Text,
  Icon,
  IconButton,
  useToast,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import { AiOutlineShop } from "react-icons/ai";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { MdAdd, MdAttachMoney, MdEdit } from "react-icons/md";

import AlertPopup from "components/alerts/AlertPopup";
import SwitchField from "components/fields/SwitchField";
import ImageUploader from "components/pages/diveCentre/ImageUploader";
import Invite from "components/pages/diveCentre/Invite";
import OwnerDiveCentreMenu from "components/pages/profile/OwnerDiveCentreMenu";
// import * as gtag from "lib/data/gtag";

export default function CentreCard(props) {
  const { diveCentre } = props;
  const supabase = useSupabaseClient();
  const toast = useToast();
  const posthog = usePostHog();
  const textColor = useColorModeValue("gray.700", "white");
  const textColorActive = useColorModeValue("green.600", "green.400");
  const textColorInactive = useColorModeValue("red.700", "red.400");
  const [active, setActive] = useState(diveCentre.active);

  const router = useRouter();
  const iconColor = useColorModeValue("brand.500", "white");
  const greenIcon = useColorModeValue("green.500", "white");
  const redIcon = useColorModeValue("red.500", "white");
  const yellowIcon = useColorModeValue("yellow.500", "white");
  const bgIconButton = useColorModeValue("white", "whiteAlpha.100");
  const bgIconHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgIconFocus = useColorModeValue(
    { bg: "white" },
    { bg: "whiteAlpha.100" }
  );
  const shadow = useColorModeValue(
    "18px 17px 40px 4px rgba(112, 144, 176, 0.1)",
    "unset"
  );

  async function updateStatus(newStatus) {
    await setActive(newStatus);
    const { data, error } = await supabase
      .from("dive_centres")
      .update({ active: newStatus })
      .select()
      .eq("id", diveCentre.id);

    if (error) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="danger"
            text="Unable to update Dive Centre"
            subtext={error.message}
          />
        ),
      });
      // gtag.event({
      //   action: "update-dive-centre-failed",
      //   category: "button",
      //   label: "Dive Centre",
      //   // value: newItem.title,
      // });
      posthog.capture("Dive Centre Update Failed", {
        "Dive Centre": diveCentre.name,
      });
    }
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
      // gtag.event({
      //   action: "update-dive-centre-success",
      //   category: "button",
      //   label: "Dive Centre",
      //   // value: newItem.title,
      // });
      posthog.capture("Dive Centre Updated", {
        "Dive Centre": diveCentre.name,
      });
    }
  }

  return (
    <>
      <Box mb="10px" w="100%">
        <Flex justify="space-between" align="center" w="100%">
          <Flex>
            <Flex direction="column">
              <Text fontSize="md" color={textColor} fontWeight="700">
                {diveCentre.name}
              </Text>
              <Text fontSize="sm" color="gray.500" fontWeight="500">
                Dive Centre
              </Text>
            </Flex>
          </Flex>
          <OwnerDiveCentreMenu
            diveCentreSlug={diveCentre.slug}
            icon={
              <Icon
                as={IoEllipsisHorizontal}
                w="24px"
                h="24px"
                color={textColor}
              />
            }
          />
        </Flex>
      </Box>
      <SimpleGrid
        columns={{ sm: 1, md: 1, xl: 2 }}
        spacing={{ base: "20px", xl: "0px" }}
      >
        <ImageUploader diveCentre={diveCentre} />
        <SimpleGrid
          columns={{ sm: 1, md: 1, xl: 1 }}
          spacing={{ base: "20px", xl: "0px" }}
          ml={{ sm: 0, lg: 5 }}
        >
          <SwitchField
            me="30px"
            id="1"
            isChecked={active}
            onChange={() => updateStatus(!active)}
            // onChange={() => setActive(!active)}
            label={`Status: ${active ? "Active" : "Not Active"}`}
            desc="If disabled, your dive centre will no longer appear in the search results and will not receive any new bookings."
            labelColor={active ? textColorActive : textColorInactive}
          />
          <Flex justify="space-between" w="100%" my={5}>
            <Flex
              direction="column"
              align="center"
              me={{ base: "16px", md: "0px", "2xl": "36px" }}
            >
              <IconButton
                borderRadius="50%"
                bg={bgIconButton}
                _hover={bgIconHover}
                _active={bgIconFocus}
                _focus={bgIconFocus}
                w="56px"
                h="56px"
                mb="5px"
                boxShadow={shadow}
                onClick={() => router.push(`/dive_centres/${diveCentre.slug}`)}
                icon={
                  <Icon
                    as={AiOutlineShop}
                    color={iconColor}
                    w="24px"
                    h="24px"
                  />
                }
              />
              <Text fontSize="sm" fontWeight="500" color={textColor}>
                View Page
              </Text>
            </Flex>
            <Flex
              direction="column"
              align="center"
              me={{ base: "16px", md: "0px", "2xl": "36px" }}
            >
              <IconButton
                borderRadius="50%"
                bg={bgIconButton}
                _hover={bgIconHover}
                _active={bgIconFocus}
                _focus={bgIconFocus}
                w="56px"
                h="56px"
                mb="5px"
                boxShadow={shadow}
                onClick={() =>
                  router.push(`/dive_centres/${diveCentre?.slug}/edit`)
                }
                icon={<Icon as={MdEdit} color={yellowIcon} w="24px" h="24px" />}
              />
              <Text fontSize="sm" fontWeight="500" color={textColor}>
                Edit
              </Text>
            </Flex>
            <Flex
              direction="column"
              align="center"
              me={{ base: "16px", md: "0px", "2xl": "36px" }}
            >
              <IconButton
                borderRadius="50%"
                bg={bgIconButton}
                _hover={bgIconHover}
                _active={bgIconFocus}
                _focus={bgIconFocus}
                w="56px"
                h="56px"
                mb="5px"
                boxShadow={shadow}
                onClick={() =>
                  router.push(
                    `/dive_centres/${diveCentre?.slug}/dive_trips/new`
                  )
                }
                icon={<Icon as={MdAdd} color={greenIcon} w="24px" h="24px" />}
              />
              <Text fontSize="sm" fontWeight="500" color={textColor}>
                Add Trip
              </Text>
            </Flex>
            <Flex direction="column" align="center">
              <IconButton
                borderRadius="50%"
                bg={bgIconButton}
                _hover={bgIconHover}
                _active={bgIconFocus}
                _focus={bgIconFocus}
                w="56px"
                h="56px"
                mb="5px"
                boxShadow={shadow}
                onClick={() =>
                  router.push(`/dive_centres/${diveCentre.slug}/order_list`)
                }
                icon={
                  <Icon as={MdAttachMoney} color={redIcon} w="24px" h="24px" />
                }
              />
              <Text fontSize="sm" fontWeight="500" color={textColor}>
                Orders
              </Text>
            </Flex>
          </Flex>
          <Invite
            referralCode={`${process.env.NEXT_PUBLIC_SITE_URL}/dive_centres/${diveCentre?.slug}`}
            fbLink="#"
            twtLink="#"
            gridArea={{
              base: "2 / 1 / 3 / 3",
              "2xl": "1 / 2 / 2 / 3",
            }}
          />
        </SimpleGrid>
      </SimpleGrid>
    </>
  );
}
