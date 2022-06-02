/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { useState, useEffect } from "react";
import { useMoralisQuery } from "react-moralis";

export default function useTokenUriDetails(contractAddress, tokenId) {
  const [nftName, setNFTname] = useState();
  const [description, setNFTdescription] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [metaAttributes, setMetaAttributes] = useState();

  const {
    data: tokenData,
    error: tokenError,
    isLoading: tokenIsLoading,
  } = useMoralisQuery("PolygonNFTOwners", (query) =>
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
      )
  );

  // const tokenId = tokenData[0]?.attributes?.token_id;
  const symbol = tokenData[0]?.attributes?.symbol;
  const owner = tokenData[0]?.attributes?.owner_of;
  const createdAt = tokenData[0]?.attributes?.createdAt.toLocaleDateString();

  useEffect(() => {
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
        console.error(error);
      }
    }
    getNFTurl();
  }, [tokenData]);

  return {
    imageUrl,
    nftName,
    description,
    metaAttributes,
    tokenId,
    owner,
    symbol,
    isLoading: tokenIsLoading,
    createdAt,
  };
}
