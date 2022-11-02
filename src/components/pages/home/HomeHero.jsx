import {
  Heading,
  Text,
  Box,
  Stack,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Parallax } from "react-scroll-parallax";

const HomeHero = () => {
  const router = useRouter();

  const handleClick = (e, link) => {
    e.preventDefault();
    router.push(link);
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      bgImage="url(/svg/wave-bg.svg)"
      bgRepeat="no-repeat"
      px={8}
      py={24}
      // mx={{ base: "-10px", md: "-50px" }}
      // mt="-50px"
      w="auto"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        w={{ base: "full", md: 11 / 12, xl: 9 / 12 }}
        mx="auto"
        mt={{ sm: 8, md: 0 }}
        // pr={{ md: 20 }}
      >
        <Box mx="auto" px={{ base: 4, lg: 8 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            mb={{ sm: "10", lg: "20" }}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as="span"
              fontSize={{ sm: "3xl", lg: "6xl" }}
              fontWeight="black"
              position="relative"
            >
              Coral Playground
            </Text>
            <br />
            <Text
              as="span"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize={{ sm: "xl", lg: "3xl" }}
              fontWeight="black"
            >
              The Ocean Metaverse
            </Text>
          </Heading>
          <Stack
            direction={{ base: "column", md: "row" }}
            mb={{ base: 4, md: 8 }}
            spacing={2}
          >
            <Button
              rounded="full"
              size="lg"
              fontWeight="normal"
              px={6}
              onClick={(e) => {
                handleClick(e, "../admin/nfts/marketplace");
              }}
              bg="#7928CA"
              color="white"
              zIndex="2"
              _hover={{ bg: "purple.500" }}
            >
              Explore Collections
            </Button>
            <Button
              rounded="full"
              size="lg"
              fontWeight="normal"
              color="white"
              px={6}
              bg="#FF0080"
              zIndex={20}
              _hover={{ bg: "pink.600" }}
              onClick={(e) => {
                handleClick(e, "../admin/nfts/drops");
              }}
            >
              Mint your NFT
            </Button>
          </Stack>
        </Box>
      </Box>
      <Box w={{ base: "full" }} mx="auto" textAlign="center">
        <Parallax translateX={[30, -30]} scale={[0, 1.5]} speed={20}>
          <Image
            alt="Hero Image"
            align="center"
            minW="90hw"
            w="full"
            src="/img/home/parallax/landing-orca.png"
            opacity={0.99}
            startScroll={500}
          />
        </Parallax>
      </Box>
    </Flex>
  );
};

export default HomeHero;
