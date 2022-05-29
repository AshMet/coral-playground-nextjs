/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import { Button, Text, useColorModeValue } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useMoralis } from "react-moralis";

import { CoralPgContext } from "../../contexts/CoralPgContext";

export default function Balance() {
  const { isAuthenticating, authenticate } = useMoralis();
  const { ethBalance, getEthBalance } = useContext(CoralPgContext);

  useEffect(() => {
    getEthBalance();
  }, [ethBalance]);

  return (
    <Text
      w="max-content"
      color={useColorModeValue("gray.700", "white")}
      fontSize="sm"
      fontWeight="700"
      me="6px"
    >
      {parseFloat(ethBalance).toFixed(3)}
      <Text as="span" display={{ base: "none", md: "unset" }}>
        {" "}
        {ethBalance ? (
          <Text as="span" ml={1}>
            MATIC
          </Text>
        ) : (
          <Button
            isLoading={isAuthenticating}
            onClick={() => authenticate()}
            variant="link"
            colorScheme="purple"
            size="sm"
            mr={1}
          >
            Connect Wallet
          </Button>
        )}
      </Text>
    </Text>
  );
}
