import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import Image from "next/image";
import { useContext } from "react";

// Chakra imports
import { CoralPgContext } from "../../../contexts/CoralPgContext";

// import LineChart from "components/charts/LineChart";
// Custom components
// import {
//   lineChartDataSidebar,
//   lineChartOptionsSidebar,
// } from "variables/charts";
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
        {/* <Text
          fontSize={{ base: "lg", xl: "2xl" }}
          color="white"
          fontWeight="bold"
          lineHeight="150%"
          textAlign="center"
          px="10px"
        >
          $3942.58
        </Text> */}
        {isAuthenticated && (
          <>
            <Box>
              <Image
                src={`https://avatars.dicebear.com/api/miniavs/${username}.svg`}
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
        {/* <Text
          fontSize="sm"
          color="white"
          px="10px"
          mb="14px"
          textAlign="center"
        >
          Username
        </Text> */}
        {/* <Box h="160px">
          <LineChart
            chartData={lineChartDataSidebar}
            chartOptions={lineChartOptionsSidebar}
          />
        </Box> */}
      </Flex>
    </Flex>
  );
}
