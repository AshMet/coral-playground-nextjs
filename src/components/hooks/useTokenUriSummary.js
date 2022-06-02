/* eslint-disable no-console */
import { useState, useEffect } from "react";

export default function useTokenUriSummary(tokenUri) {
  const [imageUrl, setImageUrl] = useState();
  const [nftName, setNFTname] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getNFTurl() {
      try {
        const response = await fetch(tokenUri);
        const responseJson = await response.json();
        setImageUrl(responseJson.image);
        setNFTname(responseJson.name);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getNFTurl();
  }, [tokenUri]);

  return { imageUrl, nftName, isLoading };
}
