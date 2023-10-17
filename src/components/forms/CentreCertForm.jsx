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

export default function CentreCertForm(props) {
  const { diveCentreSlug, certs, diveCentreCert, setDiveCentreCert, onOpen } =
    props;
  const { price, certId, active } = diveCentreCert || {};
  const textColorSecondary = "secondaryGray.600";
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  // const handleChange = (e) => {
  //   setDiveCentreCert({ ...diveCentreCert, [e.target.name]: e.target.value });
  // };
  const handleNumberChange = (e) => {
    setDiveCentreCert({
      ...diveCentreCert,
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
    setDiveCentreCert({
      ...diveCentreCert,
      price: Number(itemPrice) * 100,
    });
  }, [itemPrice]);

  useEffect(() => {
    setDiveCentreCert({
      ...diveCentreCert,
      active: itemActive,
    });
  }, [itemActive]);

  // console.log("new trip centre slug", diveCentreSlug);

  useEffect(() => {
    posthog.capture("$pageview");
  }, []);

  // NOTE: This is still failing when the user tries to add a previously created  price
  async function saveCentreCert() {
    const { data: diveCentre } = await supabase
      .from("dive_centres")
      .select("id, name")
      .eq("slug", diveCentreSlug)
      .single();

    const selectedItem = certs.filter((item) => item.id === certId)[0];
    const certName = selectedItem.name;
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
        nickname: `${certName} - €${price / 100}`,
        lookup_key: `${certName.replace(/ /g, "_").toLowerCase()}_${price}eur`,
        product: stripeProdId,
        type: "one_time",
        unit_amount: price,
      }
    );

    // console.log("stripePriceId", stripePriceId);

    const { data: centreCertData, error: centreCertError } = await supabase
      .from("centre_certifications")
      .upsert(
        {
          active,
          price,
          stripe_price_id: stripePriceId,
          dive_centre_id: diveCentre.id,
          certification_id: certId,
        },
        {
          onConflict: ["dive_centre_id", "certification_id"],
        }
      )
      .select("*")
      .single();

    if (centreCertError) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="danger"
            text="Unable to Add Centre Course"
            subtext={centreCertError.message}
          />
        ),
      });
      posthog.capture("Unable to Add Centre Course", {
        "Dive Centre": diveCentre?.name,
        Error: centreCertError.message,
      });
    } else if (centreCertData) {
      toast({
        position: "top",
        render: () => (
          <AlertPopup
            type="success"
            text="Course Added"
            subtext={centreCertData.certName}
          />
        ),
      });

      posthog.capture("Dive Centre Course Added", {
        "Dive Centre": diveCentre.name,
        Price: centreCertData.price / 100,
        Status: centreCertData.active ? "Active" : "Inactive",
      });
      // Close modal - this is not working
      onOpen(false);
      // router.push(nextUrl || `/dive_centres/${diveCentreSlug}`);
    }
  }

  // console.log("generic", tripType);
  // console.log("centreEqiupment", diveCentreCert);

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
                htmlFor="certifications"
                fontSize="sm"
                fontWeight="bold"
                _placeholder={{ color: textColorSecondary }}
                _hover={{ cursor: "pointer" }}
              >
                Certification
              </FormLabel>
              <Select
                name="certId"
                fontSize="sm"
                id="certification"
                variant="main"
                h="44px"
                maxh="44px"
                defaultValue={60}
                borderColor={borderColor}
                placeholder="How long before the dive should the user arrive?"
                value={certId}
                onChange={handleNumberChange}
              >
                {certs.map((cert, index) => (
                  <option value={cert.id} key={index}>
                    {cert.name}
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
            onClick={saveCentreCert}
          >
            Add Course
          </Button>
        </Card>
      </FormControl>
    </Flex>
  );
}
