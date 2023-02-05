/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable func-names */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react/jsx-no-bind */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   ____  ____   ___  
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| |  _ \|  _ \ / _ \ 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |  | |_) | |_) | | | |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |  |  __/|  _ <| |_| |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___| |_|   |_| \_\\___/ 
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.horizon-ui.com/pro/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  SimpleGrid,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import {
  MdDashboard,
  MdApps,
  MdOutlineCollections,
  MdFormatPaint,
  MdAccessTime,
  MdOutlineLocalOffer,
} from "react-icons/md";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";

import Avatar1 from "../../../../../public/img/avatars/avatar1.png";
import Avatar2 from "../../../../../public/img/avatars/avatar2.png";
import Avatar3 from "../../../../../public/img/avatars/avatar3.png";
import Avatar4 from "../../../../../public/img/avatars/avatar4.png";
import AvatarSimmmple from "../../../../../public/img/avatars/avatarSimmmple.png";
import Nft2 from "../../../../../public/img/nfts/Nft2.png";
import Nft4 from "../../../../../public/img/nfts/Nft4.png";
import Nft5 from "../../../../../public/img/nfts/Nft5.png";
import Nft6 from "../../../../../public/img/nfts/Nft6.png";
import NftBanner3 from "../../../../../public/img/nfts/NftBanner3.png";
// import Image from "../../../../components/actions/NextChakraImg";
import Banner from "../../../../components/pages/nftProfile/Banner";
import SearchBar from "../../../../components/pages/nftProfile/Search";
import CollectionCard from "components/card/CollectionCard";
import NFT from "components/card/NFT";
import { HSeparator } from "components/separator/Separator";
import NftLayout from "layouts/NftLayout";

export default function Collection() {
  const [tabState, setTabState] = useState("collected");

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
  const paleGray = useColorModeValue("secondaryGray.400", "whiteAlpha.100");
  const { user } = useMoralis();
  const { data, error, isLoading } = useMoralisCloudFunction("getUserNFTs");
  const [ownedNFTs, setOwnedNFTs] = useState();

  useEffect(() => {
    if (!data) return null;
    setOwnedNFTs(data);
  }, [data, user]);

  const collectedList = (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px">
      {ownedNFTs?.length > 0 &&
        ownedNFTs
          .slice(10, 13)
          .map((nft) => <CollectionCard nft={nft} />)
          .reverse()}
    </SimpleGrid>
  );

  const panelExample = (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px">
      <NFT
        name="Swipe Circles"
        author="By Peter Will"
        bidders={[
          Avatar1,
          Avatar2,
          Avatar3,
          Avatar4,
          Avatar1,
          Avatar1,
          Avatar1,
          Avatar1,
        ]}
        image={Nft4}
        currentBid="0.91 ETH"
        download="#"
      />
      <NFT
        name="Colorful Heaven"
        author="By Mark Benjamin"
        bidders={[
          Avatar1,
          Avatar2,
          Avatar3,
          Avatar4,
          Avatar1,
          Avatar1,
          Avatar1,
          Avatar1,
        ]}
        image={Nft5}
        currentBid="0.91 ETH"
        download="#"
      />
      <NFT
        name="3D Cubes Art"
        author="By Manny Gates"
        bidders={[
          Avatar1,
          Avatar2,
          Avatar3,
          Avatar4,
          Avatar1,
          Avatar1,
          Avatar1,
          Avatar1,
        ]}
        image={Nft6}
        currentBid="0.91 ETH"
        download="#"
      />
      <NFT
        name="ETH AI Brain"
        author="By Nick Wilson"
        bidders={[
          Avatar1,
          Avatar2,
          Avatar3,
          Avatar4,
          Avatar1,
          Avatar1,
          Avatar1,
          Avatar1,
        ]}
        image={Nft2}
        currentBid="0.91 ETH"
        download="#"
      />
    </SimpleGrid>
  );
  // Chakra Color Mode
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Box mb="20px" display={{ base: "block", lg: "grid" }}>
        <Flex flexDirection="column">
          <Banner
            image={NftBanner3}
            profile={AvatarSimmmple}
            wallet="7MVqsRijvkNBhXSCLSKP2Gpc8HsGVqR7iWnLpZynz8DK"
            address="simmmple.web"
            name="Simmmple"
            date="Joined 17 Nov 2019"
            floor={0.56}
            volume={33.8}
            owners={4.6}
            items={28}
          />
        </Flex>
      </Box>
      <Tabs variant="soft-rounded" colorScheme="brandTabs">
        <TabList
          mx={{ base: "10px", lg: "30px" }}
          overflowX={{ sm: "scroll", lg: "unset" }}
        >
          <Flex justify={{ base: "start", md: "center" }} w="100%">
            <Tab
              pb="0px"
              flexDirection="column"
              onClick={function () {
                setTabState("collected");
              }}
              me="50px"
              bg="unset"
              _selected={{
                bg: "none",
              }}
              _focus={{ border: "none" }}
              minW="max-content"
            >
              <Flex align="center">
                <Icon
                  color={textColor}
                  as={MdOutlineCollections}
                  w="20px"
                  h="20px"
                  me="8px"
                />
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="500"
                  me="12px"
                >
                  Collected
                </Text>
                <Text color="secondaryGray.600" fontSize="md" fontWeight="400">
                  0
                </Text>
              </Flex>
              <Box
                height="4px"
                w="100%"
                transition="0.1s linear"
                bg={tabState === "collected" ? "brand.500" : "transparent"}
                mt="15px"
                borderRadius="30px"
              />
            </Tab>
            <Tab
              onClick={function () {
                setTabState("created");
              }}
              pb="0px"
              me="50px"
              bg="unset"
              _selected={{
                bg: "none",
              }}
              _focus={{ border: "none" }}
              minW="max-content"
              flexDirection="column"
            >
              <Flex align="center">
                <Icon
                  color={textColor}
                  as={MdFormatPaint}
                  w="20px"
                  h="20px"
                  me="8px"
                />
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="500"
                  me="12px"
                >
                  Created
                </Text>
                <Text color="secondaryGray.600" fontSize="md" fontWeight="400">
                  4
                </Text>
              </Flex>
              <Box
                height="4px"
                w="100%"
                transition="0.1s linear"
                bg={tabState === "created" ? "brand.500" : "transparent"}
                mt="15px"
                borderRadius="30px"
              />
            </Tab>
            <Tab
              pb="0px"
              flexDirection="column"
              onClick={function () {
                setTabState("favorited");
              }}
              me="50px"
              bg="unset"
              _selected={{
                bg: "none",
              }}
              _focus={{ border: "none" }}
              minW="max-content"
            >
              <Flex align="center">
                <Icon
                  color={textColor}
                  as={IoMdHeartEmpty}
                  w="20px"
                  h="20px"
                  me="8px"
                />
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="500"
                  me="12px"
                >
                  Favorited
                </Text>
                <Text color="secondaryGray.600" fontSize="md" fontWeight="400">
                  12
                </Text>
              </Flex>
              <Box
                height="4px"
                w="100%"
                transition="0.1s linear"
                bg={tabState === "favorited" ? "brand.500" : "transparent"}
                mt="15px"
                borderRadius="30px"
              />
            </Tab>
            <Tab
              pb="0px"
              flexDirection="column"
              onClick={function () {
                setTabState("activity");
              }}
              me="50px"
              bg="unset"
              _selected={{
                bg: "none",
              }}
              _focus={{ border: "none" }}
              minW="max-content"
            >
              <Flex align="center">
                <Icon
                  color={textColor}
                  as={MdAccessTime}
                  w="20px"
                  h="20px"
                  me="8px"
                />
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="500"
                  me="12px"
                >
                  Activity
                </Text>
              </Flex>
              <Box
                height="4px"
                w="100%"
                transition="0.1s linear"
                bg={tabState === "activity" ? "brand.500" : "transparent"}
                mt="15px"
                borderRadius="30px"
              />
            </Tab>
            <Tab
              pb="0px"
              flexDirection="column"
              onClick={function () {
                setTabState("offers");
              }}
              me="50px"
              bg="unset"
              _selected={{
                bg: "none",
              }}
              _focus={{ border: "none" }}
              minW="max-content"
            >
              <Flex align="center">
                <Icon
                  color={textColor}
                  as={MdOutlineLocalOffer}
                  w="20px"
                  h="20px"
                  me="8px"
                />
                <Text
                  color={textColor}
                  fontSize="lg"
                  fontWeight="500"
                  me="12px"
                >
                  Offers
                </Text>
                <Text color="secondaryGray.600" fontSize="md" fontWeight="400">
                  7
                </Text>
              </Flex>
              <Box
                height="4px"
                w="100%"
                transition="0.1s linear"
                bg={tabState === "offers" ? "brand.500" : "transparent"}
                mt="15px"
                borderRadius="30px"
              />
            </Tab>
          </Flex>
        </TabList>
        <HSeparator mb="30px" bg={paleGray} mt="0px" />
        <Flex w="100%">
          <SearchBar />
          <Select
            fontSize="sm"
            id="edit_product"
            variant="main"
            h="44px"
            maxh="44px"
            me="20px"
            defaultValue="single"
          >
            <option value="single">Single Items</option>
            <option value="multiple">Multiple Items</option>
          </Select>
          <Select
            fontSize="sm"
            variant="main"
            h="44px"
            maxh="44px"
            me="20px"
            defaultValue="low_to_high"
          >
            <option value="low_to_high">Low to high</option>
            <option value="high_to_low">High to low</option>
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
          4 Results
        </Text>
        <TabPanels>
          <TabPanel px="0px">{collectedList}</TabPanel>
          <TabPanel px="0px">{panelExample}</TabPanel>
          <TabPanel px="0px">{panelExample}</TabPanel>
          <TabPanel px="0px">{panelExample}</TabPanel>
          <TabPanel px="0px">{panelExample}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

Collection.getLayout = function getLayout(page) {
  return <NftLayout>{page}</NftLayout>;
};
