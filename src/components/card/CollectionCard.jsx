/* eslint-disable react/prop-types */
/* eslint-disable no-console */
import { useState, useEffect } from "react";

import Avatar1 from "../../../public/img/avatars/avatar1.png";
import Avatar2 from "../../../public/img/avatars/avatar2.png";
import Avatar3 from "../../../public/img/avatars/avatar3.png";
import Avatar4 from "../../../public/img/avatars/avatar4.png";

import NFT from "./NFT";

export default function CollectionCard(props) {
  const { nft } = props;
  const [imageUrl, setImageUrl] = useState();
  const [nftName, setNFTname] = useState();
  // const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getNFTurl() {
      try {
        const response = await fetch(nft.tokenUri);
        const responseJson = await response.json();
        setImageUrl(responseJson.image);
        setNFTname(responseJson.name);
      } catch (error) {
        console.error(error);
      } finally {
        // setLoading(false);
      }
    }
    getNFTurl();
  }, [nft.tokenUri]);

  return (
    <NFT
      key={nft.tokenUri}
      name={nftName}
      author="Author"
      bidders={[Avatar1, Avatar2, Avatar3, Avatar4, Avatar1, Avatar1]}
      image={imageUrl}
      currentBid="10"
      download="#"
      to={`../../nfts/${nft.nftContract}/${nft.tokenId}`}
    />
  );
}
