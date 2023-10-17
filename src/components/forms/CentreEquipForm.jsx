/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-plusplus */
import {
  Flex,
  FormControl,
  SimpleGrid,
  FormLabel,
  Select,
  useColorModeValue,
  Switch,
  useToast,
  Button,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import axios from "axios";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";

import AlertPopup from "components/alerts/AlertPopup";
import Card from "components/card/Card";
import InputField from "components/fields/InputField";
// import TextField from "components/fields/TextField";

export default function CentreEquipForm(props) {
  const {
    diveCentreSlug,
    equipment,
    diveCentreEquip,
    setDiveCentreEquip,
    onOpen,
  } = props;
  const { price, equipmentId, active } = diveCentreEquip || {};
  const textColorSecondary = "secondaryGray.600";
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  // const handleChange = (e) => {
  //   setDiveCentreEquip({ ...diveCentreEquip, [e.target.name]: e.target.value });
  // };
  const handleNumberChange = (e) => {
    setDiveCentreEquip({
      ...diveCentreEquip,
      [e.target.name]: Number(e.target.value),
    });
  };

  // const [tripPrice, setTripPrice] = useState();
  // const [tripActive, setTripActive] = useState(active);
  const toast = useToast();
  const posthog = usePostHog();
  const supabase = useSupabaseClient();
  // const commission = 0.1;
  const [itemPrice, setItemPrice] = useState();
  const [itemActive, setItemActive] = useState(active);

  useEffect(() => {
    setDiveCentreEquip({
      ...diveCentreEquip,
      price: Number(itemPrice) * 100,
    });
  }, [itemPrice]);

  useEffect(() => {
    setDiveCentreEquip({
      ...diveCentreEquip,
      active: itemActive,
    });
  }, [itemActive]);

  // console.log("new trip centre slug", diveCentreSlug);

  useEffect(() => {
    posthog.capture("$pageview");
  }, []);

  // NOTE: This is still failing when the user tries to add a previously created  price
  async function saveCentreEquip() {
    const { data: diveCentre } = await supabase
      .from("dive_centres")
      .select("id, name")
      .eq("slug", diveCentreSlug)
      .single();

    const selectedItem = equipment.filter((item) => item.id === equipmentId)[0];
    const equipName = selectedItem.name;
    const stripeProdId = selectedItem.stripe_product_id;

    // console.log("selectedItem", selectedItem);
    // console.log("stripeProdId", stripeProdId);

    // Create Stripe price
    const {
      data: { id: stripePriceId },
    } = await axios.post(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/stripe/create_price`,
      {
        // active,
        currency: "eur",
        nickname: `${equipName} - €${price / 100}`,
        lookup_key: `${equipName.replace(/ /g, "_").toLowerCase()}_${price}eur`,
        product: stripeProdId,
        type: "one_time",
        unit_amount: price,
      }
    );

    // console.log("stripePriceId", stripePriceId);

    const { data: centreEquipData, error: centreEquipError } = await supabase
      .from("centre_equipment")
      .upsert(
        {
          active,
          price,
          stripe_price_id: stripePriceId,
          dive_centre_id: diveCentre.id,
          equipment_id: equipmentId,
        },
        {
          onConflict: ["dive_centre_id", "equipment_id"],
        }
      )
      .select("*")
      .single();

    if (centreEquipError) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="danger"
            text="Unable to Add Centre Equipment"
            subtext={centreEquipError.message}
          />
        ),
      });
      posthog.capture("Unable to Add Centre Equipment", {
        "Dive Centre": diveCentre?.name,
        Error: centreEquipError.message,
      });
    } else if (centreEquipData) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="success"
            text="Equipment Item Added"
            subtext={centreEquipData.equipName}
          />
        ),
      });

      posthog.capture("Dive Centre Equipment Added", {
        "Dive Centre": diveCentre.name,
        Price: centreEquipData.price / 100,
        Status: centreEquipData.active ? "Active" : "Inactive",
      });
      // Close modal - this is not working
      onOpen(false);
      // router.push(nextUrl || `/dive_centres/${diveCentreSlug}`);
    }
  }

  // console.log("generic", tripType);
  // console.log("centreEqiupment", diveCentreEquip);

  return (
    <Flex direction="column" mt={{ sm: "20px", md: "0px" }}>
      {/* Row 2: Trip Details */}
      <FormControl>
        <Card mb={{ base: "0px", xl: "20px" }}>
          <SimpleGrid
            columns={{ sm: 1, md: 2 }}
            spacing={{ base: "20px", xl: "20px" }}
          >
            <Flex direction="column" mb="20px">
              <FormLabel
                ms="10px"
                htmlFor="equipment"
                fontSize="sm"
                fontWeight="bold"
                _placeholder={{ color: textColorSecondary }}
                _hover={{ cursor: "pointer" }}
              >
                Equipment
              </FormLabel>
              <Select
                name="equipmentId"
                fontSize="sm"
                id="equipment"
                variant="main"
                h="44px"
                maxh="44px"
                defaultValue={60}
                borderColor={borderColor}
                placeholder="How long before the dive should the user arrive?"
                value={equipmentId}
                onChange={handleNumberChange}
              >
                {equipment.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </Select>
            </Flex>

            <InputField
              mb="0px"
              name="price"
              label={`Price (${
                price ? (price / 100).toFixed(2) : "Enter value in"
              } Euro)`}
              value={price && price / 100}
              placeholder="Total Price in Euros including commission"
              onChange={(e) => setItemPrice(e.target.value)}
              isError={price === "" || price < 1}
              errorMessage="Price cannot be empty"
            />

            <Flex>
              <Switch
                id="active"
                name="active"
                colorScheme="purple"
                isChecked={itemActive}
                defaultChecked
                onChange={() => setItemActive(!itemActive)}
              />
              <FormLabel
                ms="10px"
                htmlFor="active"
                fontSize="sm"
                fontWeight="bold"
                _placeholder={{ color: textColorSecondary }}
                _hover={{ cursor: "pointer" }}
              >
                {active
                  ? "Active: Publicly visible on your dive centre page"
                  : "Inactive: Trip is hidden from customers"}
              </FormLabel>
            </Flex>
          </SimpleGrid>
          <Button
            // isLoading={tripDives.length === 0}
            // isDisabled={tripDives.length === 0}
            loadingText="Select a Dive"
            spinnerPlacement="end"
            // spinner={<BeatLoader size={8} color='white' />}
            variant="darkBrand"
            fontSize="sm"
            borderRadius="16px"
            w="100%"
            h="46px"
            ms="auto"
            mt={10}
            onClick={saveCentreEquip}
          >
            Add Eqiupment Item
          </Button>
        </Card>
      </FormControl>
    </Flex>
  );
}
