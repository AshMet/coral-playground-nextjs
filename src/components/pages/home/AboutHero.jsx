import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";

// import { Parallax } from "react-scroll-parallax";

// import SurfaceImg from "../../assets/img/landing_page/parallax/water_surface.png";
// import WhaleImg from "../../assets/img/landing_page/parallax/whale.png";
import Image from "components/actions/NextChakraImg";

const AboutHero = () => (
  <Box
    // backgroundImage={SurfaceImg}
    backgroundRepeat="no-repeat"
    background="cover"
  >
    <Container maxW="7xl">
      <Stack
        minH="100vh"
        align="center"
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        {/* <Parallax translateX={[-20, 0, "easeOutExpo"]}> */}
        <Stack flex={1} spacing={{ base: 5, md: 10 }} mt="10" width="lg">
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as="span"
              fontSize="6xl"
              fontWeight="black"
              position="relative"
              // _after={{
              //   content: "''",
              //   width: 'full',
              //   height: '30%',
              //   position: 'absolute',
              //   bottom: 1,
              //   left: 0,
              //   bg: 'purple.400',
              //   zIndex: -1,
              // }}
            >
              Coral Playground
            </Text>
            <br />
            <Text
              as="span"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="3xl"
              fontWeight="extrabold"
            >
              Digital Collectibles, Physical Impact
            </Text>
          </Heading>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded="full"
              size="lg"
              fontWeight="normal"
              px={6}
              // onClick={() => {
              //   navigate("/nft/marketplace");
              // }}
              bg="#7928CA"
              _hover={{ bg: "purple.500" }}
            >
              Explore Collections
            </Button>
            <Button
              rounded="full"
              size="lg"
              fontWeight="normal"
              px={6}
              bg="#FF0080"
              _hover={{ bg: "green.500" }}
              // onClick={() => {
              //   navigate("/nft/drops");
              // }}
            >
              Mint your NFT
            </Button>
          </Stack>
        </Stack>
        {/* </Parallax> */}
        {/* <Parallax speed={-10}> */}
        <Flex
          flex={1}
          justify="center"
          align="center"
          position="relative"
          w="full"
        >
          <Image
            alt="Hero Image"
            fit="cover"
            align="center"
            w="100%"
            h="100%"
            src="img/home/parallax/landing-orca.png"
          />
        </Flex>
        {/* </Parallax> */}
      </Stack>
    </Container>
  </Box>
);

export default AboutHero;
