import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useContext } from "react";

import { CoralPgContext } from "../../../contexts/CoralPgContext";

export default function SidebarDocs() {
  const bgColor = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";

  const {
    isAuthenticated,
    // buyTokens,
    // getBalance,
    nickname,
    setNickname,
    username,
    handleSetUsername,
  } = useContext(CoralPgContext);

  return (
    <Flex
      justify="center"
      direction="column"
      align="center"
      bg={bgColor}
      borderRadius="30px"
      me="20px"
      position="relative"
    >
      <Flex
        direction="column"
        mb="25px"
        align="center"
        justify="center"
        px="15px"
        pt="30px"
      >
        {isAuthenticated && (
          <>
            <Box>
              <Image
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${username}`}
                alt="profile"
                height={100}
                width={100}
              />
            </Box>
            {!username ? (
              <>
                <Box>
                  <Input
                    type="text"
                    placeholder="Username...."
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </Box>
                <Button
                  colorScheme="purple"
                  size="sm"
                  borderRadius="58px"
                  mt="10px"
                  onClick={handleSetUsername}
                >
                  Set Nickname
                </Button>
              </>
            ) : (
              <Box>
                <Text>Wecome {username}</Text>
              </Box>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
}
