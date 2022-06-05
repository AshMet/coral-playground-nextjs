/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* eslint-disable sonarjs/no-duplicate-string */
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

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";
// import Image from "next/image";
// import React from "react";
// Custom components
import { useState, useEffect } from "react";
import { MdDashboard, MdApps } from "react-icons/md";
import { useMoralisQuery } from "react-moralis";

// Assets
import Avatar1 from "../../../../../public/img/avatars/avatar1.png";
import Avatar2 from "../../../../../public/img/avatars/avatar2.png";
import Avatar3 from "../../../../../public/img/avatars/avatar3.png";
import Avatar4 from "../../../../../public/img/avatars/avatar4.png";
import NftBanner2 from "../../../../../public/img/nfts/NftBanner2.png";
import NftProfile from "../../../../../public/img/nfts/NftProfile.png";
import NFT from "../../../../components/card/NFT";
import Banner from "../../../../components/pages/nftCollection/Banner";
import SearchBar from "../../../../components/pages/nftCollection/Search";
import AdminLayout from "layouts/admin";

export default function Collection() {
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

  const [ownedNFTs, setOwnedNFTs] = useState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isLoading } = useMoralisQuery("DivePhoto", (query) =>
    query
      .equalTo(
        "nftContractAddress",
        "0x29a1d6FFA3d19492ef80B026A987b2E72890B934"
      )
      .select(
        "name",
        "priceInWei",
        "user.nickname",
        "user.username",
        "nftId",
        "nftFilePath"
      )
  );

  useEffect(() => {
    if (!data) return null;
    setOwnedNFTs(data);
  }, [data]);

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Box mb="20px" display={{ base: "block", lg: "grid" }}>
        <Flex flexDirection="column">
          <Banner
            image={NftBanner2}
            profile="/img/home/octopus_bg.png"
            creator="ash.met"
            name="Agro Octo®"
            desc={`Octo is the genesis character in the coral playground and the first of many to come. With a limited mint quantity of 1000, 
            this NFT will represent early adopters in our project and help us accelerate our delivery milestones.
            Additionally, as with all our drops, 10% of all profits will be set aside for marine preservation initiatives to be voted
            on by the coral DAO.`}
            floor={0.56}
            volume={33.8}
            owners={4.6}
            items={28}
          />
        </Flex>
      </Box>
      <Flex w="100%">
        <SearchBar />
        <Select
          fontSize="sm"
          id="edit_product"
          variant="main"
          h="44px"
          maxh="44px"
          me={{ base: "10px", md: "20px" }}
        >
          <option value="single">Single Items</option>
          <option value="multiple">Multiple Items</option>
        </Select>
        <Select
          fontSize="sm"
          variant="main"
          h="44px"
          maxh="44px"
          me={{ base: "10px", md: "20px" }}
        >
          <option value="low_to_high">Low to high</option>
          <option value="high_to_low">High to low</option>
        </Select>
        <Button
          me={{ base: "10px", md: "20px" }}
          bg={buttonBg}
          border="1px solid"
          color="secondaryGray.600"
          borderColor={useColorModeValue("secondaryGray.100", "whiteAlpha.100")}
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
          borderColor={useColorModeValue("secondaryGray.100", "whiteAlpha.100")}
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
        More from this Collection
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px">
        {ownedNFTs?.length > 0 &&
          ownedNFTs
            .map((nft) => (
              <NFT
                name={nft.attributes.name}
                author={nft.attributes.user?.attributes?.nickname}
                bidders={[Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar2]}
                image={nft.attributes.nftFilePath}
                currentBid={nft.attributes.priceInWei / 1000000000000000000}
                download="#"
              />
            ))
            .reverse()}
      </SimpleGrid>

      {/* Delete Product */}
    </Box>
  );
}

Collection.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
