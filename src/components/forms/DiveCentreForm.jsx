/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-plusplus */
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useRouter } from "next/router";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import slugify from "slugify";

import AlertPopup from "components/alerts/AlertPopup";
import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import SwitchField from "components/fields/SwitchField";
import TextField from "components/fields/TextField";
// import ImageUploader from "components/pages/diveCentre/ImageUploader";
import MapWithAutoComplete from "components/maps/MapWithAutoComplete";
// import * as gtag from "lib/data/gtag";
import { updateBrevoBusinessName } from "utils/sendInBlue/contacts";

export default function DiveCentreForm(props) {
  const { diveCentre, setDiveCentre, newOwnerId, noRedirect } = props;
  // const initialState = {
  //   name: diveCente ? diveCente.name : "",
  //   description: diveCente ? diveCente.description : "",
  //   address: diveCente ? diveCente.address : "",
  //   latitude: diveCente ? diveCente.latitude : "",
  //   longitude: diveCente ? diveCente.longitude : "",
  //   paymentMethods: diveCente ? diveCente.paymentMethods : [],
  //   equipment: diveCente ? diveCente.equipment : [],
  //   memberships: diveCente ? diveCente.memberships : [],
  //   languages: diveCente ? diveCente.languages : [],
  //   services: diveCente ? diveCente.services : [],
  //   cityId: diveCente ? diveCente.cityId : "",
  //   active: diveCente ? diveCente.active : false,
  // };

  const toast = useToast();

  const placeholderColor = "secondaryGray.600";
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  const borderPrimary = useColorModeValue(
    "secondaryGray.100",
    "whiteAlpha.100"
  );
  const textColorActive = useColorModeValue("green.600", "green.400");
  const textColorInactive = useColorModeValue("red.700", "red.400");
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const posthog = usePostHog();

  const {
    id,
    name,
    description,
    address,
    latitude,
    longitude,
    paymentMethods,
    memberships,
    equipment,
    languages,
    services,
    active,
    cityId,
    // city,
    ownerId,
  } = diveCentre || {};

  const [loading, setLoading] = useState(false);
  const [activeStatus, setActiveStatus] = useState(active || false);

  const handleChange = (e) => {
    setDiveCentre({ ...diveCentre, [e.target.name]: e.target.value });
  };

  // Payment Methods
  const paymentOptions = [
    { value: "cash", label: "Cash" },
    { value: "credit card", label: "Credit Card" },
    { value: "paypal", label: "Paypal" },
  ];
  const [paymentPickerItems] = useState(paymentOptions);
  const [selectedPaymentItems, setSelectedPaymentItems] = useState(
    paymentPickerItems.filter((i) => paymentMethods?.includes(i.value))
  );
  const handlePaymentItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedPaymentItems(selectedItems);
      setDiveCentre({
        ...diveCentre,
        paymentMethods: selectedItems?.map((item) => item.value),
      });
    }
  };
  // Equipment
  const equipmentOptions = [
    { value: "air tank", label: "Air Tank" },
    { value: "camera", label: "Camera" },
    { value: "drysuit", label: "Drysuit" },
    { value: "wetsuit", label: "Wetsuit" },
    { value: "fins", label: "Fins" },
    { value: "flashlight", label: "Flashlight" },
    { value: "snorkel", label: "Snorkel" },
  ];
  const [equipmentPickerItems] = useState(equipmentOptions);
  const [selectedEquipmentItems, setSelectedEquipmentItems] = useState(
    equipmentOptions.filter((i) => equipment?.includes(i.value))
  );
  const handleEquipmentItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedEquipmentItems(selectedItems);
      setDiveCentre({
        ...diveCentre,
        equipment: selectedItems?.map((item) => item.value),
      });
    }
  };
  // Languages
  const languagesOptions = [
    { value: "english", label: "English" },
    { value: "arabic", label: "Arabic" },
    { value: "french", label: "French" },
    { value: "spanish", label: "Spanish" },
    { value: "dutch", label: "Dutch" },
    { value: "german", label: "German" },
    { value: "russian", label: "Russian" },
    { value: "czech", label: "Czech" },
    { value: "ukranian", label: "Ukranian" },
    { value: "chinese", label: "Chinese" },
  ];
  const [languagePickerItems] = useState(languagesOptions);
  const [selectedLanguageItems, setSelectedLanguageItems] = useState(
    languagesOptions.filter((i) => languages?.includes(i.value))
  );
  const handleLanguageItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedLanguageItems(selectedItems);
      setDiveCentre({
        ...diveCentre,
        languages: selectedItems?.map((item) => item.value),
      });
    }
  };
  // Memberships
  const membershipOptions = [
    { value: "padi", label: "PADI" },
    { value: "ssi", label: "SSI" },
  ];
  const [membershipPickerItems] = useState(membershipOptions);
  const [selectedMembershipItems, setSelectedMembershipItems] = useState(
    membershipOptions.filter((i) => memberships?.includes(i.value))
  );
  const handleMembershipItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedMembershipItems(selectedItems);
      setDiveCentre({
        ...diveCentre,
        memberships: selectedItems?.map((item) => item.value),
      });
    }
  };
  // Services
  const servicesOptions = [
    { value: "air compressor", label: "Air Compressor" },
    { value: "bar", label: "Bar" },
    { value: "classroom", label: "Classroom" },
    { value: "shop", label: "Shop" },
    { value: "lockers", label: "Lockers" },
    { value: "lounge", label: "Lounge" },
    { value: "restaurant", label: "Restaurant" },
    { value: "showers", label: "Showers" },
    { value: "snorkelling", label: "Snorkelling" },
    { value: "wifi", label: "Wifi" },
  ];
  const [servicePickerItems] = useState(servicesOptions);
  const [selectedServiceItems, setSelectedServiceItems] = useState(
    servicesOptions.filter((i) => services?.includes(i.value))
  );
  const handleServiceItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedServiceItems(selectedItems);
      setDiveCentre({
        ...diveCentre,
        services: selectedItems?.map((item) => item.value),
      });
    }
  };

  const cityNames = {
    "Marsa Alam": 1,
    Hurghada: 2,
    "Sharm El Sheikh": 3,
    Dahab: 4,
    Safaga: 6,
  };

  const getCityName = (obj, val) =>
    Object.keys(obj).filter((key) => obj[key] === val)[0];

  const createDiveCentre = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("dive_centres")
      .upsert({
        id,
        name,
        description,
        address,
        latitude,
        longitude,
        equipment,
        payment_methods: paymentMethods,
        languages,
        memberships,
        services,
        active: activeStatus,
        city_id: cityId,
        owner_id: newOwnerId || ownerId || user?.id,
      })
      .select()
      .single();

    // Success Alert
    if (data) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="success"
            text="Dive Centre Created!"
            // subtext="View Shopping Cart to complete your order"
          />
        ),
      });
      // Success Analytics Tag
      // gtag.event({
      //   action: "create-dive-centre-success",
      //   category: "button",
      //   label: "Dive Centre",
      //   // value: newItem.title,
      // });
      posthog.capture("Dive Centre Created", {
        "Dive Centre": data.name,
        City: getCityName(cityNames, data.cityId),
        Status: data.active ? "Active" : "Inactive",
      });
      updateBrevoBusinessName(user.email, data.name, "business");
      if (!noRedirect) {
        router.push(
          `/dive_centres/${slugify(data.name.replace("&", ""), {
            lower: true,
            remove: /[*+~.()'"!:@]/g,
          })}`
        );
      }
    }

    // Alert & Analytics for failed load
    if (error) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="danger"
            text="Unable to save Dive Trip"
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
      posthog.capture("Dive Centre Creation Failed", {
        "Dive Centre": name,
        Error: error.message,
      });
    }
    setLoading(false);
  };

  // console.log("form", diveCentre);

  return (
    <Box p="0px" mx="auto">
      <Card mb={{ base: "0px", xl: "20px" }}>
        <Flex direction="column" mb="40px" ms="10px">
          <Text fontSize="xl" color={textColorPrimary} fontWeight="bold">
            Create your Dive Centre
          </Text>
          <Text fontSize="md" color={textColorSecondary}>
            Once published, customers will be able to view your dive centre and
            book diving trips
          </Text>
        </Flex>
        {/* <ImageUploader avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} /> */}
        <MapWithAutoComplete
          diveCentre={diveCentre}
          setDiveCentre={setDiveCentre}
        />
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}
        >
          <InputField
            mb="0px"
            name="name"
            label="Name"
            value={name}
            placeholder="Name of your dive centre"
            onChange={handleChange}
            isError={name === ""}
            errorMessage="name cannot be empty"
            isRequired
          />
          <TextField
            name="address"
            label="Address"
            mb="0px"
            h="100%"
            value={address}
            placeholder="Provide Address and directions where needed"
            onChange={handleChange}
          />
          <InputField
            mb="0px"
            name="latitude"
            label="Latitude"
            value={latitude}
            placeholder="eg. 45.2342"
            onChange={handleChange}
            isError={latitude === ""}
            errorMessage="latitude cannot be empty"
            isRequired
          />
          <InputField
            mb="0px"
            name="longitude"
            label="Longitude"
            value={longitude}
            placeholder="eg. 72.2342"
            onChange={handleChange}
            isError={longitude === ""}
            errorMessage="longitude cannot be empty"
            isRequired
          />

          <CUIAutoComplete
            name="paymentMethods"
            label="Payment Methods"
            placeholder="Select all payment options offered by your dive centre"
            items={paymentPickerItems}
            labelStyleProps={{
              fontSize: "sm",
              fontWeight: "extrabold",
              ml: "5px",
              mt: "20px",
            }}
            inputStyleProps={{
              fontSize: "sm",
              borderRadius: "2xl",
              borderColor: borderPrimary,
              h: "44px",
              _placeholder: { color: placeholderColor },
            }}
            tagStyleProps={{
              rounded: "full",
              py: 1,
              px: 2,
              color: "white",
              bgColor: useColorModeValue("brand.300", "brand.400"),
            }}
            listStyleProps={{ color: "black", bgColor: "gray.200" }}
            selectedItems={selectedPaymentItems}
            onSelectedItemsChange={(changes) =>
              handlePaymentItemsChange(changes.selectedItems)
            }
            disableCreateItem
          />
          <CUIAutoComplete
            name="equipment"
            label="Equipment"
            placeholder="Select all equipment available at your dive centre"
            items={equipmentPickerItems}
            labelStyleProps={{
              fontSize: "sm",
              fontWeight: "extrabold",
              ml: "5px",
              mt: "20px",
            }}
            inputStyleProps={{
              fontSize: "sm",
              borderRadius: "2xl",
              borderColor: borderPrimary,
              h: "44px",
              _placeholder: { color: placeholderColor },
            }}
            tagStyleProps={{
              rounded: "full",
              py: 1,
              px: 2,
              color: "white",
              bgColor: useColorModeValue("brand.300", "brand.400"),
            }}
            listStyleProps={{ color: "black", bgColor: "gray.200" }}
            selectedItems={selectedEquipmentItems}
            onSelectedItemsChange={(changes) =>
              handleEquipmentItemsChange(changes.selectedItems)
            }
            disableCreateItem
          />
          <CUIAutoComplete
            name="languages"
            label="Languages"
            placeholder="Select all languages spoken by your staff"
            items={languagePickerItems}
            labelStyleProps={{
              fontSize: "sm",
              fontWeight: "extrabold",
              ml: "5px",
              mt: "20px",
            }}
            inputStyleProps={{
              fontSize: "sm",
              borderRadius: "2xl",
              borderColor: borderPrimary,
              h: "44px",
              _placeholder: { color: placeholderColor },
            }}
            tagStyleProps={{
              rounded: "full",
              py: 1,
              px: 2,
              color: "white",
              bgColor: useColorModeValue("brand.300", "brand.400"),
            }}
            listStyleProps={{ color: "black", bgColor: "gray.200" }}
            selectedItems={selectedLanguageItems}
            onSelectedItemsChange={(changes) =>
              handleLanguageItemsChange(changes.selectedItems)
            }
            disableCreateItem
          />
          <CUIAutoComplete
            name="memberships"
            label="Memberships"
            placeholder="Select all organizations your dive centre is affiliated with"
            items={membershipPickerItems}
            labelStyleProps={{
              fontSize: "sm",
              fontWeight: "extrabold",
              ml: "5px",
              mt: "20px",
            }}
            inputStyleProps={{
              fontSize: "sm",
              borderRadius: "2xl",
              borderColor: borderPrimary,
              h: "44px",
              _placeholder: { color: placeholderColor },
            }}
            tagStyleProps={{
              rounded: "full",
              py: 1,
              px: 2,
              color: "white",
              bgColor: useColorModeValue("brand.300", "brand.400"),
            }}
            listStyleProps={{ color: "black", bgColor: "gray.200" }}
            selectedItems={selectedMembershipItems}
            onSelectedItemsChange={(changes) =>
              handleMembershipItemsChange(changes.selectedItems)
            }
            disableCreateItem
          />
          <CUIAutoComplete
            name="services"
            label="Services"
            placeholder="Select all services available at your dive centre"
            items={servicePickerItems}
            labelStyleProps={{
              fontSize: "sm",
              fontWeight: "extrabold",
              ml: "5px",
              mt: "20px",
            }}
            inputStyleProps={{
              fontSize: "sm",
              borderRadius: "2xl",
              borderColor: borderPrimary,
              h: "44px",
              _placeholder: { color: placeholderColor },
            }}
            tagStyleProps={{
              rounded: "full",
              py: 1,
              px: 2,
              color: "white",
              bgColor: useColorModeValue("brand.300", "brand.400"),
            }}
            listStyleProps={{ color: "black", bgColor: "gray.200" }}
            selectedItems={selectedServiceItems}
            onSelectedItemsChange={(changes) =>
              handleServiceItemsChange(changes.selectedItems)
            }
            disableCreateItem
          />
          <Flex direction="column">
            <FormLabel
              ms="10px"
              mt={{ md: "30px" }}
              htmlFor="checkIn"
              fontSize="sm"
              fontWeight="bold"
              _placeholder={{ color: placeholderColor }}
              _hover={{ cursor: "pointer" }}
            >
              City
            </FormLabel>
            <Select
              fontSize="sm"
              name="cityId"
              variant="main"
              h="44px"
              maxh="44px"
              placeholder="Select City"
              borderColor={borderPrimary}
              value={cityId}
              onChange={handleChange}
              isInvalid={cityId === ""}
              isRequired
            >
              <option value="4">Dahab</option>
              <option value="2">Hurghada</option>
              <option value="1">Marsa Alam</option>
              <option value="6">Safaga</option>
              <option value="3">Sharm El Sheikh</option>
            </Select>
          </Flex>
          <TextField
            name="description"
            label="Description"
            mb="0px"
            h="100%"
            value={description}
            placeholder="Additional Information about your business and operations"
            onChange={handleChange}
          />
          <SwitchField
            mb="25px"
            me="30px"
            id="1"
            size="xl"
            name="active"
            // value={!active}
            isChecked={activeStatus || false}
            onChange={() => setActiveStatus(!activeStatus)}
            label={`Status: ${activeStatus ? "Active" : "Not Active"}`}
            desc="If disabled, your dive centre will no longer appear in the search results and will no longer be able to receive any new bookings. This can be changed back at any time."
            labelColor={active ? textColorActive : textColorInactive}
          />
        </SimpleGrid>
      </Card>
      <Flex justify="space-between" mt="24px">
        <Button
          variant="solid"
          bgColor="brand.400"
          color="white"
          minW="100%"
          fontSize="sm"
          fontWeight="500"
          ms="auto"
          _hover={{ bgColor: "brand.300" }}
          onClick={createDiveCentre}
          disabled={loading}
        >
          {loading
            ? "Loading ..."
            : diveCentre?.id
            ? "Edit Dive Centre"
            : "Create Dive Centre"}
        </Button>
      </Flex>
    </Box>
  );
}
