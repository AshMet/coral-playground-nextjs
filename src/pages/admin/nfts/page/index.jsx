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
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
// import React from "react";

// Assets
import Avatar1 from "../../../../../public/img/avatars/avatar1.png";
import Avatar2 from "../../../../../public/img/avatars/avatar2.png";
import Avatar3 from "../../../../../public/img/avatars/avatar3.png";
import Avatar4 from "../../../../../public/img/avatars/avatar4.png";
import AvatarSimmmple from "../../../../../public/img/avatars/avatarSimmmple.png";
import Nft2 from "../../../../../public/img/nfts/Nft2.png";
import Nft4 from "../../../../../public/img/nfts/Nft4.png";
import Nft5 from "../../../../../public/img/nfts/Nft5.png";
import Nft6 from "../../../../../public/img/nfts/Nft6.png";
import NftLarge1 from "../../../../../public/img/nfts/NftLarge1.png";
import Card from "../../../../components/card/Card";
import NFT from "components/card/NFT";

import Auction from "./components/Auction";
import Banner from "./components/Banner";
import Description from "./components/Description";
import TableLastOffer from "./components/TableLastOffer";
import { tableColumnsLastOffer } from "./variables/tableColumnsLastOffer";
import tableDataLastOffer from "./variables/tableDataLastOffer.json";

export default function Page() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  // Chakra Color Mode
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        maxW="100%"
        gridTemplateColumns={{
          base: "1fr",
          lg: "1fr 1fr",
          "2xl": "1fr 0.95fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", lg: "grid" }}
      >
        <Flex flexDirection="column" gridArea="1 / 1 / 2 / 2">
          <Banner image={NftLarge1} />
          <Description
            desc="The Abstractus® project is an online art show and the First Art NFTs on Ethereum, launched on May 9, 2017. Abstractus® features 28 unique series of cards from 7 different artists. Abstractus® are referenced with CryptoAbstractus® and Crypto in the original ERC-721 Non-Fungible Token Standard, and pre-dates them both. Join the Abstractus® Discord and check out theAbstractus® Docs to find out more."
            creator="simmmple.web"
          />
        </Flex>
        <Flex flexDirection="column" gridArea="1 / 2 / 2 / 3" pt="60px">
          <Auction
            name="Color Abstractus®"
            creator="Simmmple"
            creatorAvatar={AvatarSimmmple}
            price="3.87 ETH"
            bid={2.82}
          />
          <Card px="0px" mb="20px" mt="66px">
            <TableLastOffer
              tableData={tableDataLastOffer}
              columnsData={tableColumnsLastOffer}
            />
          </Card>
        </Flex>
      </Grid>
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
      </SimpleGrid>

      {/* Delete Product */}
    </Box>
  );
}
