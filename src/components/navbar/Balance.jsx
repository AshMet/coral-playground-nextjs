/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";

export default function Balance(props) {
  const { user } = props;
  const Web3Api = useMoralisWeb3Api();
  const [ethBalance, setEthBalance] = useState(0);

  const fetchNativeBalance = async () => {
    const result = await Web3Api.account
      .getNativeBalance({
        chain: "mumbai",
        address: user.get("ethAddress"),
      })
      .catch((e) => console.log(e));
    if (result.balance) {
      const ethInWei = Web3Api.Moralis.Units.FromWei(result.balance);
      setEthBalance(parseFloat(ethInWei).toFixed(3));
      // setEthBalance(result.balance);
    }
  };

  useEffect(() => {
    fetchNativeBalance();
  }, []);

  return (
    <Text
      w="max-content"
      color={useColorModeValue("gray.700", "white")}
      fontSize="sm"
      fontWeight="700"
      me="6px"
    >
      {ethBalance}
      <Text as="span" display={{ base: "none", md: "unset" }}>
        {" "}
        MATIC
      </Text>
    </Text>
  );
}
