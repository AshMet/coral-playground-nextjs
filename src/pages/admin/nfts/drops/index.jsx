/* eslint-disable import/no-cycle */
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
import { useState } from "react";

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
import Banner from "../../../../components/pages/nftDrops/Banner";
import Description from "../../../../components/pages/nftDrops/Description";
import NFT from "components/card/NFT";
import ColorPicker from "components/pages/nftDrops/ColorPicker";
// import TableLastOffer from "./components/TableLastOffer";
import AdminLayout from "layouts/admin";

export default function Drops() {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [bodyBase, setBodyBase] = useState("#ffffff"); // default: #71c6c1
  const [bodyShading, setBodyShading] = useState("#ffffff");
  const [tentacles, setTentacles] = useState("#ffffff");
  const [tentacleShading, setTentacleShading] = useState("#ffffff");
  const [eyeColor, setEyeColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb="20px"
        maxW="100%"
        gridTemplateColumns={{
          base: "1fr",
          lg: "2fr 1fr",
          "2xl": "1fr 0.95fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", lg: "grid" }}
      >
        <Flex flexDirection="column" gridArea="1 / 1 / 2 / 2">
          <Banner
            bodyBase={bodyBase}
            bodyShading={bodyShading}
            tentacles={tentacles}
            tentacleShading={tentacleShading}
            eyeColor={eyeColor}
            backgroundColor={backgroundColor}
            image={NftLarge1}
          />
          <Description
            desc={`Octo is the genesis character in the coral playground and the first of many to come. With a limited mint quantity of 1000, 
            this NFT will represent early adopters in our project and help us accelerate our delivery milestones.
            Additionally, as with all our drops, 10% of all profits will be set aside for marine preservation initiatives to be voted
            on by the coral DAO.`}
            creator="ash.met"
          />
        </Flex>
        <Flex flexDirection="column" gridArea="1 / 2 / 2 / 3" pt="60px">
          <ColorPicker
            creator="#FFFFFF"
            creatorAvatar={AvatarSimmmple}
            price="#000000"
            mintPrice={0.1}
            setBodyBase={setBodyBase}
            setBodyShading={setBodyShading}
            setTentacles={setTentacles}
            setTentacleShading={setTentacleShading}
            setEyeColor={setEyeColor}
            setBackgroundColor={setBackgroundColor}
          />
          <Flex
            direction="column"
            w="100%"
            overflowX={{ sm: "scroll", lg: "hidden" }}
          >
            <Flex
              align="center"
              justify="space-between"
              w="100%"
              px="22px"
              pb="8px"
              boxShadow="0px 40px 58px -20px rgba(112, 144, 176, 0.12)"
            />
          </Flex>
          <Card px="0px" mb="20px" mt="66px">
            {/* <TableLastOffer
              tableData={tableDataLastOffer}
              columnsData={tableColumnsLastOffer}
            /> */}
          </Card>
        </Flex>
      </Grid>
      {/* <Text
        mt="25px"
        mb="36px"
        color={textColor}
        fontSize="2xl"
        ms="24px"
        fontWeight="700"
      >
        More from this Collection
      </Text> */}
      {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px">
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
      </SimpleGrid> */}

      {/* Delete Product */}
    </Box>
  );
}

Drops.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
