/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-plusplus */
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useRouter } from "next/router";
import { useState } from "react";

import { supabase } from "../../../api/index";
import AlertPopup from "components/alerts/AlertPopup";
import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import DivingLayout from "layouts/DivingLayout";
import * as gtag from "lib/data/gtag";

export default function UpdateDiveCentre({ diveCentreData }) {
  const toast = useToast();

  const placeholderColor = "secondaryGray.600";
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  const borderPrimary = useColorModeValue(
    "secondaryGray.100",
    "whiteAlpha.100"
  );
  const router = useRouter();

  const [diveCentre, setDiveCentre] = useState(diveCentreData);
  const [loading, setLoading] = useState(false);

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
    cityId,
  } = diveCentre;

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
        paymentMethods: selectedPaymentItems?.map((item) => item.value),
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
    equipmentOptions.filter((i) => equipment.includes(i.value))
  );
  const handleEquipmentItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedEquipmentItems(selectedItems);
      setDiveCentre({
        ...diveCentre,
        equipment: selectedEquipmentItems?.map((item) => item.value),
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
    languagesOptions.filter((i) => languages.includes(i.value))
  );
  const handleLanguageItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedLanguageItems(selectedItems);
      setDiveCentre({
        ...diveCentre,
        languages: selectedLanguageItems?.map((item) => item.value),
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
    membershipOptions.filter((i) => memberships.includes(i.value))
  );
  const handleMembershipItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedMembershipItems(selectedItems);
      setDiveCentre({
        ...diveCentre,
        memberships: selectedMembershipItems?.map((item) => item.value),
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
    servicesOptions.filter((i) => services.includes(i.value))
  );
  const handleServiceItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedServiceItems(selectedItems);
      setDiveCentre({
        ...diveCentre,
        services: selectedServiceItems?.map((item) => item.value),
      });
    }
  };

  const updateDiveCentre = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("dive_centres")
      .update({
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
        city_id: cityId,
      })
      .eq("id", id);
    // Success Alert
    toast({
      position: "top",
      render: () => (
        <AlertPopup type="success" text="Dive Centre Updated!" subtext={name} />
      ),
    });
    // Success Analytics Tag
    gtag.event({
      action: "create-dive-centre-success",
      category: "button",
      label: "Dive Centre",
      value: name,
    });
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
      gtag.event({
        action: "update-dive-centre-failed",
        category: "button",
        label: "Dive Centre",
        value: name,
      });
    }

    setLoading(false);
    router.push(`/diving/dive_centres/${id}`);
  };

  return (
    <Box p="0px" mx="auto" mt="100px">
      <FormControl>
        <Card mb={{ base: "0px", xl: "20px" }}>
          <Flex direction="column" mb="40px" ms="10px">
            <Text fontSize="xl" color={textColorPrimary} fontWeight="bold">
              Create your Dive Centre
            </Text>
            <Text fontSize="md" color={textColorSecondary}>
              Once published, customers will be able to view your dive centre
              and book diving trips
            </Text>
          </Flex>
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
            />
            <InputField
              mb="0px"
              name="longitude"
              label="Longitude"
              value={longitude}
              placeholder="eg. 72.2342"
              onChange={handleChange}
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
          </SimpleGrid>
        </Card>
      </FormControl>
      <Flex justify="space-between" mt="24px">
        <Button
          variant="solid"
          bgColor="brand.400"
          minW="100%"
          fontSize="sm"
          fontWeight="500"
          ms="auto"
          _hover={{ bgColor: "brand.300" }}
          onClick={updateDiveCentre}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
      </Flex>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { data: diveCentreData } = await supabase
    .from("dive_centre_view")
    .select(
      `id, name, description, address, latitude, longitude, paymentMethods, equipment, services, languages, memberships,
      coverPhotoUrl, city, cityId, country`
    )
    .match({ id })
    .single();

  return {
    props: {
      diveCentreData,
    },
  };
}

UpdateDiveCentre.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
