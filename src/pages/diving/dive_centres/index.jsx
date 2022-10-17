/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable sonarjs/no-duplicate-string */
import {
  chakra,
  Box,
  Button,
  Flex,
  Icon,
  Select,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { motion, AnimatePresence, isValidMotionProp } from "framer-motion";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { MdApps, MdDashboard } from "react-icons/md";

// import { SearchBar } from "views/admin/nfts/profile/components/Search";
import DiveSiteCard from "components/card/DiveSiteCard";
import AdminLayout from "layouts/admin";

// const Moralis = require("moralis/node");

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

export default function DiveSites({ data }) {
  // const { image, name, address } = props;
  // const name = "Dive Site";
  // const address = "Hurghada, Egypt";
  // const parsedData = JSON.parse(data);

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const buttonBg = useColorModeValue("transparent", "navy.800");
  const hoverButton = useColorModeValue(
    { bg: "gray.100" },
    { bg: "whiteAlpha.100" }
  );
  const activeButton = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.200" }
  );

  const [country, setCountry] = useState();
  const [city, setCity] = useState(0);
  const [filtered, setFiltered] = useState();

  useEffect(() => {
    if (!data) return null;
    if (city === 0 || city === "All Cities") {
      setFiltered(data);
      return;
    }
    console.log("centres", data);
    const cityFiltered = data.filter((site) => site.city === city);
    setFiltered(cityFiltered);
  }, [data, city, country]);

  return (
    <>
      <NextSeo
        title="Dive Centres"
        description="A list of all partner dive centres."
      />
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        {/* <Text>{JSON.stringify(data[0].diveMap)}</Text> */}
        <Flex w="100%">
          {/* <SearchBar /> */}
          <Select
            value={country}
            fontSize="sm"
            id="edit_product"
            variant="main"
            h="44px"
            maxh="44px"
            me="20px"
            // placeholder="Please select"
            defaultValue="egypt"
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="Egypt">Egypt</option>
          </Select>
          <Select
            value={city}
            fontSize="sm"
            variant="main"
            h="44px"
            maxh="44px"
            me="20px"
            // placeholder="All Cities"
            defaultValue="All Cities"
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="All Cities">All Cities</option>
            <option value="Hurghada">Hurghada</option>
            <option value="Marsa Alam">Marsa Alam</option>
            <option value="Sharm El Sheikh">Sharm El Sheikh</option>
            <option value="Dahab">Dahab</option>
          </Select>
          <Button
            me="20px"
            bg={buttonBg}
            border="1px solid"
            color="secondaryGray.600"
            borderColor={useColorModeValue(
              "secondaryGray.100",
              "whiteAlpha.100"
            )}
            borderRadius="16px"
            _placeholder={{ color: "secondaryGray.600" }}
            _hover={hoverButton}
            _active={activeButton}
            _focus={activeButton}
          >
            <Icon color={textColor} as={MdDashboard} />
          </Button>
          <Button
            bg={buttonBg}
            border="1px solid"
            color="secondaryGray.600"
            borderColor={useColorModeValue(
              "secondaryGray.100",
              "whiteAlpha.100"
            )}
            borderRadius="16px"
            _placeholder={{ color: "secondaryGray.600" }}
            _hover={hoverButton}
            _active={activeButton}
            _focus={activeButton}
          >
            <Icon color={textColor} as={MdApps} />
          </Button>
        </Flex>
        <Text
          mt="25px"
          mb="36px"
          color={textColor}
          fontSize="2xl"
          ms="24px"
          fontWeight="700"
        >
          {filtered?.length} Results
        </Text>
        <ChakraBox layout>
          {/* <motion.div display="grid" displayTemplateColumns="repeat(autoFit, minmax(250px, 1fr)" gridColumnGap="1rem" gridRowGap="2rem"> */}
          <AnimatePresence>
            <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px">
              {filtered &&
                filtered.map((centre) => {
                  return (
                    <DiveSiteCard
                      key={centre.id}
                      id={centre.id}
                      image={
                        centre.cover_photo || "/img/diving/dive_centre_bg.jpg"
                      }
                      name={centre.name}
                      type="dive_centre"
                      // address={`${site.city}, ${site.country}`}
                    />
                  );
                })}
            </SimpleGrid>
          </AnimatePresence>
        </ChakraBox>
      </Box>
    </>
  );
}

// This works with parsed data in the body. Not sure why images were not working
// export async function getStaticProps() {
//   const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
//   const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
//   Moralis.initialize(appId);
//   Moralis.serverURL = serverUrl;
//   const DiveCentreList = Moralis.Object.extend("DiveCentres");
//   const query = new Moralis.Query(DiveCentreList);
//   const results = await query.ascending("name").find();
//   const data = JSON.stringify(results);

//   return {
//     props: { data },
//   };
// }

export async function getStaticProps() {
  try {
    const results = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/dive_centres`
    );
    const { data } = results;
    return {
      props: { data },
    };
  } catch (error) {
    console.error(error);
  }
}
DiveSites.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
