/* eslint-disable react/prop-types */
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  Stack,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { Parallax } from "react-scroll-parallax";

function TimelineWrapper(props) {
  const { children } = props;
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius="xl"
    >
      {children}
    </Box>
  );
}

export default function HomeBenefits() {
  const translate50d = "translate(-50%)";
  const bgColor = useColorModeValue("purple.300", "purple.700");
  return (
    <Flex
      // bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={{ sm: "5", md: "10", lg: "20" }}
      w="auto"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        py={12}
        // bg={useColorModeValue("white", "gray.800")}
        rounded="xl"
      >
        <Box maxW="7xl" mx="auto" px={{ base: 4, lg: 8 }}>
          <Box textAlign={{ lg: "center" }}>
            <chakra.h2
              color={useColorModeValue("brand.600")}
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Timeline
            </chakra.h2>
            <chakra.p
              mt={2}
              fontSize={{ base: "3xl", sm: "4xl" }}
              lineHeight="8"
              fontWeight="extrabold"
              letterSpacing="tight"
              color={useColorModeValue("gray.900")}
            >
              Driving Continuous Value
            </chakra.p>
            <chakra.p
              mt={4}
              maxW="2xl"
              fontSize="xl"
              mx={{ lg: "auto" }}
              color={useColorModeValue("gray.500", "gray.400")}
            >
              {`Starting with our genesis NFT drops and then expanding the
              platform's features and partnerships, Coral Playground will be
              constantly progressing in a strategic phased approach to ensure
              issues are addressed and stability is maintained.`}
            </chakra.p>
          </Box>

          <Box mt={10}>
            <Stack
              direction={{ base: "column", md: "row" }}
              textAlign="center"
              justify="center"
              spacing={{ base: 4, lg: 10 }}
              pt={50}
            >
              <Parallax
                translateX={[-20, 0, "easeOutExpo"]}
                translateY={[0, 10]}
              >
                <TimelineWrapper>
                  <Box
                    position="relative"
                    bgGradient="linear(to-b, blue.500, purple.700)"
                    minWidth="300px"
                    borderRadius="xl"
                    border="none"
                  >
                    <Box
                      position="absolute"
                      top="-16px"
                      left="50%"
                      style={{ transform: { translate50d } }}
                    >
                      <Text
                        textTransform="uppercase"
                        bg={bgColor}
                        px={3}
                        py={1}
                        color={useColorModeValue("gray.900", "gray.300")}
                        fontSize="sm"
                        fontWeight="600"
                        rounded="xl"
                      >
                        Phase 1
                      </Text>
                    </Box>
                    <VStack py={4}>
                      <Text fontWeight="500" fontSize="2xl" color="white">
                        Market Alpha
                      </Text>
                      <List spacing={3} textAlign="start" px={5} color="white">
                        <ListItem>
                          <ListIcon
                            as={FaCheckCircle}
                            color="white.300"
                            fontWeight="500"
                          />
                          Launch first NFT Drop
                        </ListItem>
                        <ListItem>
                          <ListIcon
                            as={FaCheckCircle}
                            color="white.300"
                            fontWeight="500"
                          />
                          Implement Royalties for donations
                        </ListItem>
                      </List>
                    </VStack>
                  </Box>
                </TimelineWrapper>
              </Parallax>
              <Parallax
                translateX={[-150, 0, "easeOutExpo"]}
                translateY={[0, 20]}
              >
                <TimelineWrapper>
                  <Box
                    position="relative"
                    bgGradient="linear(to-b, blue.500, purple.700)"
                    minWidth="300px"
                    borderRadius="xl"
                    border="none"
                  >
                    <Box
                      position="absolute"
                      top="-16px"
                      left="50%"
                      style={{ transform: { translate50d } }}
                    >
                      <Text
                        textTransform="uppercase"
                        bg={bgColor}
                        px={3}
                        py={1}
                        color={useColorModeValue("gray.900", "gray.300")}
                        fontSize="sm"
                        fontWeight="600"
                        rounded="xl"
                      >
                        Phase 2
                      </Text>
                    </Box>
                    <VStack py={4}>
                      <Text fontWeight="500" fontSize="2xl" color="white">
                        Market Beta
                      </Text>
                      <List spacing={3} textAlign="start" color="white">
                        <ListItem>
                          <ListIcon
                            as={FaCheckCircle}
                            color="white.300"
                            fontWeight="500"
                          />
                          Dive Photo Minting
                        </ListItem>
                        <ListItem>
                          <ListIcon
                            as={FaCheckCircle}
                            color="white.300"
                            fontWeight="500"
                          />
                          Introduce Premium Drops
                        </ListItem>
                        <ListItem>
                          <ListIcon
                            as={FaCheckCircle}
                            color="white.300"
                            fontWeight="500"
                          />
                          Add Donation Partners
                        </ListItem>
                      </List>
                    </VStack>
                  </Box>
                </TimelineWrapper>
              </Parallax>

              <Parallax
                translateX={[-240, 0, "easeOutExpo"]}
                translateY={[0, 30]}
              >
                <TimelineWrapper>
                  <Box
                    position="relative"
                    bgGradient="linear(to-b, blue.500, purple.700)"
                    minWidth="300px"
                    borderRadius="xl"
                    border="none"
                  >
                    <Box
                      position="absolute"
                      top="-16px"
                      left="50%"
                      style={{ transform: { translate50d } }}
                    >
                      <Text
                        textTransform="uppercase"
                        bg={bgColor}
                        px={3}
                        py={1}
                        color={useColorModeValue("gray.900", "gray.300")}
                        fontSize="sm"
                        fontWeight="600"
                        rounded="xl"
                      >
                        Phase 3
                      </Text>
                    </Box>
                    <VStack py={4}>
                      <Text fontWeight="500" fontSize="2xl" color="white">
                        Market Launch
                      </Text>
                      <List spacing={3} textAlign="start" px={5} color="white">
                        <ListItem>
                          <ListIcon
                            as={FaCheckCircle}
                            color="white.300"
                            fontWeight="500"
                          />
                          Enable Dive Log NFT minting
                        </ListItem>
                        <ListItem>
                          <ListIcon
                            as={FaCheckCircle}
                            color="white.300"
                            fontWeight="500"
                          />
                          Activate Coral Playground DAO
                        </ListItem>
                        <ListItem>
                          <ListIcon
                            as={FaCheckCircle}
                            color="white.300"
                            fontWeight="500"
                          />
                          Implement first donation vote
                        </ListItem>
                      </List>
                    </VStack>
                  </Box>
                </TimelineWrapper>
              </Parallax>

              <Parallax
                translateX={[-330, 0, "easeOutExpo"]}
                translateY={[0, 40]}
              >
                <TimelineWrapper>
                  <Box
                    position="relative"
                    bgGradient="linear(to-b, blue.500, purple.700)"
                    minWidth="300px"
                    borderRadius="xl"
                    border="none"
                  >
                    <Box
                      position="absolute"
                      top="-16px"
                      left="50%"
                      style={{ transform: { translate50d } }}
                    >
                      <Text
                        textTransform="uppercase"
                        bg={bgColor}
                        px={3}
                        py={1}
                        color={useColorModeValue("gray.900", "gray.300")}
                        fontSize="sm"
                        fontWeight="600"
                        rounded="xl"
                      >
                        Phase 4
                      </Text>
                    </Box>
                    <VStack py={4}>
                      <Text fontWeight="500" fontSize="2xl" color="white">
                        Market Launch
                      </Text>
                      <List spacing={3} textAlign="start" px={5} color="white">
                        <ListItem>
                          <ListIcon
                            as={FaCheckCircle}
                            color="white.300"
                            fontWeight="500"
                          />
                          Lanuch Ocean explorer and gallery
                        </ListItem>
                        <ListItem>
                          <ListIcon
                            as={FaCheckCircle}
                            color="white.300"
                            fontWeight="500"
                          />
                          Implement verified Dive Logs
                        </ListItem>
                        <ListItem>
                          <ListIcon
                            as={FaCheckCircle}
                            color="white.300"
                            fontWeight="500"
                          />
                          Enable Online Dive bookings
                        </ListItem>
                      </List>
                    </VStack>
                  </Box>
                </TimelineWrapper>
              </Parallax>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
