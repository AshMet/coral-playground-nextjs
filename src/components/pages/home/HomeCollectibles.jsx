import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Grid,
  Image,
  Text,
  Center,
} from "@chakra-ui/react";
import { Parallax } from "react-scroll-parallax";

export default function HomeBenefits() {
  return (
    <Flex
      p={{ sm: "5", md: "10", lg: "20" }}
      w="auto"
      mx={{ base: "-10px", md: "-50px" }}
      justifyContent="center"
      alignItems="center"
      bgImage="/svg/wave-middle.svg"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Box py={20} rounded="xl">
        <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }} py="100px">
          <Box textAlign={{ lg: "center" }}>
            <Text
              color={useColorModeValue("gray.900")}
              fontWeight="semibold"
              letterSpacing="wide"
            >
              NFTs
            </Text>
            <Text
              mt={2}
              fontSize={{ base: "3xl", sm: "4xl" }}
              lineHeight="8"
              fontWeight="extrabold"
              letterSpacing="tight"
              color={useColorModeValue("gray.900")}
            >
              Digital Collectibles, Real-World Impact
            </Text>
            <chakra.p
              mt={4}
              maxW="4xl"
              fontSize="xl"
              mx={{ lg: "auto" }}
              color={useColorModeValue("gray.800", "gray.100")}
            >
              NFTs will be used on the platform not just as a way to share
              beautiful art and unique underwater moments, but as a way to
              reward accomplishments and incentivize positive actions. A portion
              of the profits from the sale from all assets on the platform will
              be set aside for marine preservation and coral regeneration
              projects. To ensure fair distribution and proper prioritization of
              these initiatives, NFTs will also represent the governance
              structure behind the Coral DAO.
            </chakra.p>
          </Box>

          <Box mt={10}>
            <Grid
              templateColumns={{ sm: "1fr", md: "repeat(3, 1fr)" }}
              templateRows={{
                sm: "1fr 1fr 1fr auto",
                md: "1fr 1fr",
                xl: "1fr",
              }}
              gap="24px"
            >
              <Parallax translateY={[30, 0, "easeOutExpo"]} endScroll={50}>
                <Flex direction="column">
                  <Box
                    mb="20px"
                    position="relative"
                    borderRadius="15px"
                    bgColor="purple.300"
                  >
                    <Center>
                      <Image
                        src="/img/home/octopus_bg.png"
                        borderRadius="15px"
                      />
                    </Center>

                    <Box
                      w="100%"
                      h="100%"
                      position="absolute"
                      top="0"
                      borderRadius="15px"
                      //   bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
                    />
                  </Box>
                  <Flex direction="column">
                    <Text
                      fontSize="xl"
                      color={useColorModeValue("gray.900")}
                      fontWeight="bold"
                      mb="10px"
                    >
                      Unique Collectibles
                    </Text>
                    <Text
                      fontSize="md"
                      color={useColorModeValue("gray.900")}
                      fontWeight="400"
                      mb="20px"
                    >
                      Mint your own unique custom collectible characters.
                      Limited mint quantities available from some of the top
                      artists
                    </Text>
                  </Flex>
                </Flex>
              </Parallax>
              <Parallax translateY={[60, 0, "easeOutExpo"]}>
                <Flex direction="column">
                  <Box mb="20px" position="relative" borderRadius="15px">
                    <Image
                      src="/img/home/clown_fish.jpeg"
                      borderRadius="15px"
                    />
                    <Box
                      w="100%"
                      h="100%"
                      position="absolute"
                      top="0"
                      borderRadius="15px"
                    />
                  </Box>
                  <Flex direction="column">
                    <Text
                      fontSize="xl"
                      color={useColorModeValue("gray.900")}
                      fontWeight="bold"
                      mb="10px"
                    >
                      Underwater Photos
                    </Text>
                    <Text
                      fontSize="md"
                      color={useColorModeValue("gray.900")}
                      fontWeight="400"
                      mb="20px"
                    >
                      Discover some of the amazing beauty of the oceans as
                      captured by some of the world’s best underwater
                      photographers
                    </Text>
                  </Flex>
                </Flex>
              </Parallax>
              <Parallax translateY={[90, 0, "easeOutExpo"]}>
                <Flex direction="column">
                  <Box mb="20px" position="relative" borderRadius="15px">
                    <Image src="/img/home/dive_map.png" borderRadius="15px" />
                    <Box
                      w="100%"
                      h="100%"
                      position="absolute"
                      top="0"
                      borderRadius="15px"
                    />
                  </Box>
                  <Flex direction="column">
                    <Text
                      fontSize="xl"
                      color={useColorModeValue("gray.900")}
                      fontWeight="bold"
                      mb="10px"
                    >
                      Dive Logs
                    </Text>
                    <Text
                      fontSize="md"
                      color={useColorModeValue("gray.900")}
                      fontWeight="400"
                      mb="20px"
                    >
                      Commemorate your favourite dives with unique NFTs filled
                      with all the relevant site info and customized with your
                      own data.
                    </Text>
                  </Flex>
                </Flex>
              </Parallax>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
