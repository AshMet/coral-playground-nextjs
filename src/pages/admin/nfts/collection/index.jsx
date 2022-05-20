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
import { MdDashboard, MdApps } from "react-icons/md";

// Assets
import Avatar1 from "../../../../../public/img/avatars/avatar1.png";
import Avatar2 from "../../../../../public/img/avatars/avatar2.png";
import Avatar3 from "../../../../../public/img/avatars/avatar3.png";
import Avatar4 from "../../../../../public/img/avatars/avatar4.png";
import Nft2 from "../../../../../public/img/nfts/Nft2.png";
import Nft4 from "../../../../../public/img/nfts/Nft4.png";
import Nft5 from "../../../../../public/img/nfts/Nft5.png";
import Nft6 from "../../../../../public/img/nfts/Nft6.png";
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
  // Chakra Color Mode
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Box mb="20px" display={{ base: "block", lg: "grid" }}>
        <Flex flexDirection="column">
          <Banner
            image={NftBanner2}
            profile={NftProfile}
            creator="ash.met"
            name="Agro Octo®"
            desc="The Abstractus® project is an online art show and the First Art NFTs on Ethereum, launched on May 9, 2017. Abstractus® features 28 unique series of cards from 7 different artists. Abstractus® are referenced with CryptoAbstractus® and Crypto in the original ERC-721 Non-Fungible Token Standard, and pre-dates them both. Join the Abstractus® Discord and check out theAbstractus® Docs to find out more."
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

      {/* Delete Product */}
    </Box>
  );
}

Collection.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
