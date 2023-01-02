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
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useRouter } from "next/router";
import { useState } from "react";

import AlertPopup from "components/alerts/AlertPopup";
import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
// import ImageUploader from "components/pages/diveCentre/ImageUploader";
import DivingLayout from "layouts/DivingLayout";

export default function CreateDiveCentre() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [address, setAddress] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [city, setCity] = useState();
  // const [avatarUrl, setAvatarUrl] = useState(null);
  const toast = useToast();

  const placeholderColor = "secondaryGray.600";
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.700", "white");
  const borderPrimary = useColorModeValue(
    "secondaryGray.100",
    "whiteAlpha.100"
  );
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();

  // Payment Methods
  const paymentMethods = [
    { value: "cash", label: "Cash" },
    { value: "credit card", label: "Credit Card" },
    { value: "paypal", label: "Paypal" },
  ];
  const [paymentPickerItems] = useState(paymentMethods);
  const [selectedPaymentItems, setSelectedPaymentItems] = useState([]);
  const handlePaymentItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedPaymentItems(selectedItems);
    }
  };
  // Equipment
  const equipment = [
    { value: "air tank", label: "Air Tank" },
    { value: "camera", label: "Camera" },
    { value: "drysuit", label: "Drysuit" },
    { value: "wetsuit", label: "Wetsuit" },
    { value: "fins", label: "Fins" },
    { value: "flashlight", label: "Flashlight" },
    { value: "snorkel", label: "Snorkel" },
  ];
  const [equipmentPickerItems] = useState(equipment);
  const [selectedEquipmentItems, setSelectedEquipmentItems] = useState([]);
  const handleEquipmentItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedEquipmentItems(selectedItems);
    }
  };
  // Languages
  const languages = [
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
  const [languagePickerItems] = useState(languages);
  const [selectedLanguageItems, setSelectedLanguageItems] = useState([]);
  const handleLanguageItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedLanguageItems(selectedItems);
    }
  };
  // Memberships
  const memberships = [
    { value: "padi", label: "PADI" },
    { value: "ssi", label: "SSI" },
  ];
  const [membershipPickerItems] = useState(memberships);
  const [selectedMembershipItems, setSelectedMembershipItems] = useState([]);
  const handleMembershipItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedMembershipItems(selectedItems);
    }
  };
  // Services
  const services = [
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
  const [servicePickerItems] = useState(services);
  const [selectedServiceItems, setSelectedServiceItems] = useState([]);
  const handleServiceItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedServiceItems(selectedItems);
    }
  };

  async function saveDiveCentre() {
    const { data: diveCentre, error: diveCentreError } = await supabase
      .from("dive_centres")
      .insert({
        name,
        description,
        address,
        latitude,
        longitude,
        equipment: selectedEquipmentItems?.map((item) => item.value),
        payment_methods: selectedPaymentItems?.map((item) => item.value),
        languages: selectedLanguageItems?.map((item) => item.value),
        memberships: selectedMembershipItems?.map((item) => item.value),
        services: selectedServiceItems?.map((item) => item.value),
        city_id: 3,
        owner_id: user.id,
      })
      .select()
      .single();

    if (diveCentre) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="info"
            text="Dive Centre Created"
            subtext={diveCentre.name} // Not Working
          />
        ),
      });
      router.push(`/diving/dive_centres/${diveCentre.id}`);
    }
    if (diveCentreError) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="error"
            text="Unable to save Dive Trip"
            subtext={diveCentreError.message}
          />
        ),
      });
    }
  }

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
          {/* <ImageUploader avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} /> */}
          <SimpleGrid
            columns={{ sm: 1, md: 2 }}
            spacing={{ base: "20px", xl: "20px" }}
          >
            <InputField
              mb="0px"
              id="name"
              label="Name"
              value={name}
              placeholder="Name of your dive centre"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id="address"
              label="Address"
              mb="0px"
              h="100%"
              value={address}
              placeholder="Provide Address and directions where needed"
              onChange={(e) => setAddress(e.target.value)}
            />
            <InputField
              mb="0px"
              id="latitude"
              label="Latitude"
              value={latitude}
              placeholder="eg. 45.2342"
              onChange={(e) => setLatitude(e.target.value)}
            />
            <InputField
              mb="0px"
              id="longitude"
              label="Longitude"
              value={longitude}
              placeholder="eg. 72.2342"
              onChange={(e) => setLongitude(e.target.value)}
            />

            <CUIAutoComplete
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
                id="city"
                variant="main"
                h="44px"
                maxh="44px"
                placeholder="Select City"
                borderColor={borderPrimary}
                // defaultValue={2}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="4">Dahab</option>
                <option value="2">Hurghada</option>
                <option value="1">Marsa Alam</option>
                <option value="6">Safaga</option>
                <option value="3">Sharm El Sheikh</option>
              </Select>
            </Flex>
            <TextField
              id="description"
              label="Description"
              mb="0px"
              h="100%"
              value={description}
              placeholder="Additional Information about your business and operations"
              onChange={(e) => setDescription(e.target.value)}
            />
          </SimpleGrid>
        </Card>
      </FormControl>
      <Flex justify="space-between" mt="24px">
        <Button
          // isLoading={tripDives.length === 0}
          // isDisabled={tripDives.length === 0}
          loadingText="Select a Dive"
          spinnerPlacement="end"
          // spinner={<BeatLoader size={8} color='white' />}
          variant="darkBrand"
          fontSize="sm"
          borderRadius="16px"
          w={{ base: "128px", md: "148px" }}
          h="46px"
          ms="auto"
          onClick={saveDiveCentre}
        >
          Create Dive Centre
        </Button>
      </Flex>
    </Box>
  );
}

CreateDiveCentre.getLayout = function getLayout(page) {
  return <DivingLayout>{page}</DivingLayout>;
};
