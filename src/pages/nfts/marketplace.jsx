/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
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
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";

// Assets
import Avatar1 from "../../../public/img/avatars/avatar1.png";
import Avatar2 from "../../../public/img/avatars/avatar2.png";
import Avatar3 from "../../../public/img/avatars/avatar3.png";
import Avatar4 from "../../../public/img/avatars/avatar4.png";
import Nft1 from "../../../public/img/nfts/Nft1.png";
import Nft2 from "../../../public/img/nfts/Nft2.png";
import Nft3 from "../../../public/img/nfts/Nft3.png";
import Nft4 from "../../../public/img/nfts/Nft4.png";
import Nft5 from "../../../public/img/nfts/Nft5.png";
import Nft6 from "../../../public/img/nfts/Nft6.png";
import Card from "../../components/card/Card";
import NFT from "../../components/card/NFT";
import Banner from "../../components/pages/nftMarketplace/Banner";
import HistoryItem from "../../components/pages/nftMarketplace/HistoryItem";
import TableTopCreators from "../../components/pages/nftMarketplace/TableTopCreators";
import tableColumnsTopCreators from "../../utils/variables/nftMarketplace/tableColumnsTopCreators";
import tableDataTopCreators from "../../utils/variables/nftMarketplace/tableDataTopCreators.json";
import NftLayout from "layouts/NftLayout";

export default function Marketplace() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");

  const [trendingNfts, setTrendingNfts] = useState();
  const [recentNfts, setRecentNfts] = useState();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    data: trendingData,
    error: trendingError,
    isLoading: trendingIsLoading,
  } = useMoralisQuery("DivePhoto", (query) =>
    query
      .select(
        "name",
        "priceInWei",
        "user.nickname",
        "user.username",
        "nftId",
        "nftFilePath"
      )
      .descending("updatedAt")
      .limit(3)
  );

  const {
    data: recentData,
    error: recentError,
    isLoading: recentIsLoading,
  } = useMoralisQuery("DivePhoto", (query) =>
    query
      .select(
        "name",
        "priceInWei",
        "user.nickname",
        "user.username",
        "nftId",
        "nftFilePath"
      )
      .limit(3)
  );

  useEffect(() => {
    if (!trendingData) return null;
    setTrendingNfts(trendingData);
    setRecentNfts(recentData);
  }, [trendingData, recentData]);

  return (
    <>
      <NextSeo
        title="NFT Marketplace"
        description="Collect NFTs from some of your favourite artists"
      />
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        {/* Main Fields */}
        <Grid
          mb="20px"
          gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
          gap={{ base: "20px", xl: "20px" }}
          display={{ base: "block", xl: "grid" }}
        >
          <Flex
            flexDirection="column"
            gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}
          >
            <Banner />
            <Flex direction="column">
              <Flex
                mt="45px"
                mb="20px"
                justifyContent="space-between"
                direction={{ base: "column", md: "row" }}
                align={{ base: "start", md: "center" }}
              >
                <Text
                  color={textColor}
                  fontSize="2xl"
                  ms="24px"
                  fontWeight="700"
                >
                  Trending NFTs
                </Text>
                <Flex
                  align="center"
                  me="20px"
                  ms={{ base: "24px", md: "0px" }}
                  mt={{ base: "20px", md: "0px" }}
                >
                  <Link
                    color={textColorBrand}
                    fontWeight="500"
                    me={{ base: "34px", md: "44px" }}
                    to="#art"
                  >
                    Art
                  </Link>
                  <Link
                    color={textColorBrand}
                    fontWeight="500"
                    me={{ base: "34px", md: "44px" }}
                    to="#music"
                  >
                    Music
                  </Link>
                  <Link
                    color={textColorBrand}
                    fontWeight="500"
                    me={{ base: "34px", md: "44px" }}
                    to="#collectibles"
                  >
                    Collectibles
                  </Link>
                  <Link color={textColorBrand} fontWeight="500" to="#sports">
                    Sports
                  </Link>
                </Flex>
              </Flex>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap="20px">
                {recentNfts?.length > 0 &&
                  recentNfts
                    .map((asset) => {
                      const nft = asset?.attributes;
                      const user = nft?.user?.attributes;

                      return (
                        <NFT
                          key={nft?.id}
                          name={nft?.name}
                          author={user?.nickname || user?.username}
                          bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                          image={nft?.nftFilePath}
                          currentBid={nft.priceInWei / 1000000000000000000}
                          download="#"
                        />
                      );
                    })
                    .reverse()}
              </SimpleGrid>
              <Text
                mt="45px"
                mb="36px"
                color={textColor}
                fontSize="2xl"
                ms="24px"
                fontWeight="700"
              >
                Recently Added
              </Text>
              <SimpleGrid
                columns={{ base: 1, md: 3 }}
                gap="20px"
                mb={{ base: "20px", xl: "0px" }}
              >
                {trendingNfts?.length > 0 &&
                  trendingNfts
                    .map((asset) => {
                      const nft = asset?.attributes;
                      const user = nft?.user?.attributes;

                      return (
                        <NFT
                          key={nft?.id}
                          name={nft?.name}
                          author={user?.nickname || user?.username}
                          bidders={[Avatar1, Avatar2, Avatar3, Avatar4]}
                          image={nft?.nftFilePath}
                          currentBid={nft.priceInWei / 1000000000000000000}
                          download="#"
                        />
                      );
                    })
                    .reverse()}
              </SimpleGrid>
            </Flex>
          </Flex>
          <Flex
            flexDirection="column"
            gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
          >
            <Card px="0px" mb="20px">
              <TableTopCreators
                tableData={tableDataTopCreators}
                columnsData={tableColumnsTopCreators}
              />
            </Card>
            <Card p="0px">
              <Flex
                align={{ sm: "flex-start", lg: "center" }}
                justify="space-between"
                w="100%"
                px="22px"
                py="18px"
              >
                <Text color={textColor} fontSize="xl" fontWeight="600">
                  History
                </Text>
                <Button variant="action">See all</Button>
              </Flex>

              <HistoryItem
                name="Colorful Heaven"
                author="By Mark Benjamin"
                date="30s ago"
                image={Nft5}
                price="0.91 ETH"
              />
              <HistoryItem
                name="Abstract Colors"
                author="By Esthera Jackson"
                date="58s ago"
                image={Nft1}
                price="0.91 ETH"
              />
              <HistoryItem
                name="ETH AI Brain"
                author="By Nick Wilson"
                date="1m ago"
                image={Nft2}
                price="0.91 ETH"
              />
              <HistoryItem
                name="Swipe Circles"
                author="By Peter Will"
                date="1m ago"
                image={Nft4}
                price="0.91 ETH"
              />
              <HistoryItem
                name="Mesh Gradients "
                author="By Will Smith"
                date="2m ago"
                image={Nft3}
                price="0.91 ETH"
              />
              <HistoryItem
                name="3D Cubes Art"
                author="By Manny Gates"
                date="3m ago"
                image={Nft6}
                price="0.91 ETH"
              />
            </Card>
          </Flex>
        </Grid>
        {/* Delete Product */}
      </Box>
    </>
  );
}

Marketplace.getLayout = function getLayout(page) {
  return <NftLayout>{page}</NftLayout>;
};
