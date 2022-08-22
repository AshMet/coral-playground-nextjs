/* eslint-disable no-console */
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
  Flex,
  Grid,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralisQuery } from "react-moralis";

import Avatar1 from "../../../../../public/img/avatars/avatar1.png";
import Avatar2 from "../../../../../public/img/avatars/avatar2.png";
import Avatar3 from "../../../../../public/img/avatars/avatar3.png";
import Avatar4 from "../../../../../public/img/avatars/avatar4.png";
import AvatarSimmmple from "../../../../../public/img/avatars/avatarSimmmple.png";
import Nft2 from "../../../../../public/img/nfts/Nft2.png";
import Nft4 from "../../../../../public/img/nfts/Nft4.png";
import Nft5 from "../../../../../public/img/nfts/Nft5.png";
import Nft6 from "../../../../../public/img/nfts/Nft6.png";
import Auction from "../../../../components/pages/nftPage/Auction";
import Banner from "../../../../components/pages/nftPage/Banner";
import Details from "../../../../components/pages/nftPage/Details";
import NFT from "components/card/NFT";
// import useTokenUriDetails from "components/hooks/useTokenUriDetails";
import AdminLayout from "layouts/admin";

export default function Page() {
  const router = useRouter();
  const {
    isReady,
    query: { contractAddress, tokenId },
  } = router;
  // const { contractAddress, tokenId } = router.query;
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [nftName, setNFTname] = useState();
  const [description, setNFTdescription] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [metaAttributes, setMetaAttributes] = useState();

  const {
    data: tokenData,
    // error: tokenError,
    isLoading: tokenIsLoading,
  } = useMoralisQuery(
    "PolygonNFTOwners",
    (query) =>
      query
        .equalTo("token_address", contractAddress)
        .equalTo("token_id", tokenId)
        .select(
          "token_address",
          "token_id",
          "token_uri",
          "symbol",
          "owner_of",
          "createdAt"
        ),
    [isReady],
    {
      live: true,
    }
  );

  // const tokenId = tokenData[0]?.attributes?.token_id;
  // const symbol = tokenData[0]?.attributes?.symbol;
  // const owner = tokenData[0]?.attributes?.owner_of;
  // const createdAt = tokenData[0]?.attributes?.createdAt.toLocaleDateString();

  useEffect(() => {
    if (!isReady) return null;
    if (!tokenData) return null;
    async function getNFTurl() {
      try {
        const response = await fetch(tokenData[0]?.attributes?.token_uri);
        const responseJson = await response.json();
        setNFTname(responseJson.name);
        setNFTdescription(responseJson.description);
        setImageUrl(responseJson.image);
        setMetaAttributes(responseJson.attributes);
      } catch (error) {
        console.log(error);
      }
    }
    getNFTurl();
  }, [tokenData, isReady]);

  return (
    <>
      <NextSeo
        title={`NFT Details  - ${tokenId}`}
        description="View NFT details"
      />
      <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
        {/* Main Fields */}
        {tokenIsLoading ? (
          <Text> Loading... {contractAddress}</Text>
        ) : (
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
              <Banner image={imageUrl} />
              <Details
                creator="simmmple.web"
                symbol={tokenData[0]?.attributes?.symbol}
                ipfsLink={tokenData[0]?.attributes?.token_uri}
                owner={tokenData[0]?.attributes?.owner_of}
                tokenAddress={tokenData[0]?.attributes?.token_address}
                tokenId={tokenId}
                createdAt={tokenData[0]?.attributes?.createdAt.toLocaleDateString()}
              />
            </Flex>
            <Flex flexDirection="column" gridArea="1 / 2 / 2 / 3" pt="60px">
              <Auction
                name={nftName}
                creator="Simmmple"
                creatorAvatar={AvatarSimmmple}
                price="3.87 ETH"
                metadata={metaAttributes}
                desc={description}
              />
              {/* <Card px="0px" mb="20px" mt="66px">
              <TableLastOffer
                tableData={tableDataLastOffer}
                columnsData={tableColumnsLastOffer}
              />
            </Card> */}
            </Flex>
          </Grid>
        )}
        <Text
          mt="25px"
          mb="36px"
          color={textColor}
          fontSize="2xl"
          ms="24px"
          fontWeight="700"
        >
          Other Collectibles
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
    </>
  );
}

Page.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};
