/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";
import {} from "react-icons/io";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

import SetUp from "components/actions/SetUp";
import AlertPopup from "components/alerts/AlertPopup";
import Card from "components/card/Card";
import SwitchField from "components/fields/SwitchField";
import ImageUploader from "components/pages/diveCentre/ImageUploader";
import OwnerDiveCentreMenu from "components/pages/profile/OwnerDiveCentreMenu";
// import * as gtag from "lib/data/gtag";

export default function DiveCentreHub(props) {
  const { diveCentre, loading, ...rest } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
  const bgAdd = useColorModeValue("white", "navy.800");
  const textColorActive = useColorModeValue("green.600", "green.400");
  const textColorInactive = useColorModeValue("red.700", "red.400");
  const router = useRouter();
  const [active, setActive] = useState(diveCentre.active);
  const supabase = useSupabaseClient();
  const toast = useToast();
  const posthog = usePostHog();

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
        dive_centre: diveCentre.name,
      });
    } else if (data) {
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
        dive_centre: diveCentre.name,
      });
    }
    // console.log("active: ", active);
    // console.log("newStatus: ", newStatus);
  }

  // async function updateActive() {
  //   // if (!diveCentre) {
  //   //   return null;
  //   // }
  //   const { data, error } = await supabase
  //     .from("dive_centres")
  //     .update({ active })
  //     .select()
  //     .eq("id", diveCentre.id);

  //   if (error) {
  //     toast({
  //       position: "top",
  //       render: () => (
  //         <AlertPopup
  //           type="danger"
  //           text="Unable to update Dive Centre"
  //           subtext={error.message}
  //         />
  //       ),
  //     });
  //     gtag.event({
  //       action: "update-dive-centre-failed",
  //       category: "button",
  //       label: "Dive Centre",
  //       // value: newItem.title,
  //     });
  //   }
  //   if (data) {
  //     toast({
  //       position: "top",
  //       render: () => (
  //         <AlertPopup
  //           type="danger"
  //           text="Dive Centre Updated"
  //           subtext={`Status: ${active ? "Active" : "Not Active"}`}
  //         />
  //       ),
  //     });
  //     gtag.event({
  //       action: "update-dive-centre-success",
  //       category: "button",
  //       label: "Dive Centre",
  //       // value: newItem.title,
  //     });
  //   }
  // }

  // useEffect(() => {
  //   updateActive();
  // }, [active]);

  useEffect(() => {}, [active]);

  return loading ? (
    <Card p={{ base: "15px", md: "30px" }} {...rest}>
      <Spinner size="lg" />
    </Card>
  ) : (
    <Card p={{ base: "15px", md: "30px" }} {...rest}>
      {diveCentre.id ? (
        <>
          <Box mb="45px" w="100%">
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
          <ImageUploader diveCentre={diveCentre} />
          <SimpleGrid
            columns={{ sm: 1, md: 1, xl: 1 }}
            spacing={{ base: "20px", xl: "0px" }}
          >
            <SwitchField
              mb="25px"
              mt="30px"
              me="30px"
              id="1"
              isChecked={active}
              onChange={() => updateStatus(!active)}
              // onChange={() => setActive(!active)}
              label={`Status: ${active ? "Active" : "Not Active"}`}
              desc="If disabled, your dive centre will no longer appear in the search results and will no longer be able to receive any new bookings. This can be changed back at any time."
              labelColor={active ? textColorActive : textColorInactive}
            />
            <SetUp
              py="20px"
              borderBottom="1px solid"
              borderColor={borderColor}
              name="Add Dive Trips"
              // value="Available: 7"
              actionName="Add"
              action={() =>
                router.push(`/dive_centres/${diveCentre?.slug}/dive_trips/new`)
              }
            />
            <SetUp
              py="20px"
              borderBottom="1px solid"
              borderColor={borderColor}
              name="Manage Dive Trips"
              actionName="View"
              action={() =>
                router.push(`/dive_centres/${diveCentre?.slug}/manage`)
              }
            />
            <SetUp
              py="20px"
              borderBottom="1px solid"
              borderColor={borderColor}
              name="View Orders"
              actionName="View"
              action={() =>
                router.push(`/dive_centres/${diveCentre?.slug}/order_list`)
              }
            />
            <SetUp
              py="20px"
              borderBottom="1px solid"
              borderColor={borderColor}
              name="View Dive Centre page"
              value="Active"
              actionName="View"
              action={() => router.push(`/dive_centres/${diveCentre.slug}`)}
            />
            <SetUp
              py="20px"
              borderBottom="1px solid"
              borderColor={borderColor}
              name="Edit Dive Centre"
              value={`Last change: ${new Date(
                diveCentre.updated_at
              ).toLocaleDateString("en-US", {
                // year: "2-digit",
                month: "short",
                day: "numeric",
              })}`}
              actionName="Edit"
              action={() =>
                router.push(`/dive_centres/${diveCentre?.slug}/edit`)
              }
            />
            <SetUp
              pt="20px"
              name="Archive Dive Centre"
              value="Cannot be Undone!"
              actionName="Delete"
              btnColor="brand.100"
            />
          </SimpleGrid>
        </>
      ) : (
        <Center>
          <Flex direction="column">
            <Text mb="10px">
              {" "}
              You have not set up your dive centre yet. Get Started Below:{" "}
            </Text>
            <Button
              bg="transparent"
              variant="no-hover"
              fontWeight="700"
              display="flex"
              h="max-content"
              w="max-content"
              mx="auto"
              my="30px"
              minW="max-content"
              boxShadow="unset"
              flexDirection="column"
              onClick={() => router.push("/dive_centres/new")}
            >
              <Flex
                mx="auto"
                h="max-content"
                w="max-content"
                p="3px"
                borderRadius="50%"
                bg="linear-gradient(179.78deg, #7A64FF 0.23%, #FF508B 66.58%, #FD6D53 99.75%, #FD6D53 99.75%);
              
              "
              >
                <Flex
                  borderRadius="50px"
                  align="center"
                  justify="center"
                  bg={bgAdd}
                  w="54px"
                  h="54px"
                >
                  <Icon as={MdAdd} color={textColor} w="24px" h="24px" />
                </Flex>
              </Flex>
              <Text
                mt="10px"
                textAlign="center"
                color={textColor}
                fontSize="sm"
                fontWeight="500"
              >
                Create Dive Centre
              </Text>
            </Button>
          </Flex>
        </Center>
      )}
    </Card>
  );
}
