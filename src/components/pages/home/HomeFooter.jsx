import { Grid, Box, Flex, Image } from "@chakra-ui/react";
import { Parallax } from "react-scroll-parallax";

// import ShipImg from "../../assets/img/landing_page/parallax/ship.png";
// import CrabImg from "../../assets/img/landing_page/parallax/crab_3d.png";
// import DolphinImg from "../../assets/img/landing_page/parallax/dolphin_3d.png";
// import TurtleImg from "../../assets/img/landing_page/parallax/turtle_3d.png";

const HomeFooter = () => (
  <Flex
    maxW="full"
    minW="100%"
    direction="column"
    // mx={{ base: "-10px", md: "-50px" }}
    backgroundImage="/svg/ocean-floor-bg.svg"
    backgroundRepeat="no-repeat"
    backgroundSize="cover"
  >
    <Box
      backgroundPosition="bottom"
      height="500px"
      mb="20px"
      position="relative"
      maxW="5xl"
    >
      <Grid templateColumns="repeat(4, 1fr)" gap={400} maxW="3xl">
        <Parallax
          easing="easeInCubic"
          translateX={[100, 100]}
          translateY={[400, 200]}
        >
          <Box>
            <Image
              src="/img/home/parallax/squid_3d.png"
              alt="squid"
              w="70px"
              minW="70px"
              mb={2}
            />
          </Box>
        </Parallax>
        {/* <Box>
            <Parallax translateX={[-400, 0]} translateY={[400, 500]}>
              <Image
                src={CrabImg}
                alt={"Jenny Wilson"}
                minW={"120px"}
                w={"120px"}
                mb={2}
              />
            </Parallax>
          </Box>
          <Parallax translateX={[-600, -400]} translateY={[100, 200]}>
            <Box>
              <Image
                src={TurtleImg}
                alt={"Jenny Wilson"}
                minW={"120px"}
                w={"120px"}
                mb={2}
              />
            </Box>
          </Parallax> */}
        {/* <Parallax
            easing="easeInOutCubic"
            translateX={[100, -350]}
            >
            <Box>
              <Image
                src={DolphinImg}
                alt={"Jenny Wilson"}
                minW={"250px"}
                w={"250px"}
                mb={2}
              />
            </Box>
          </Parallax> */}
      </Grid>
    </Box>
    <Box>
      <Parallax speed={-10}>
        <Image
          alt="Hero Image"
          // align={"end"}
          w="100%"
          src="/img/home/parallax/coral.png"
          // left={"0"}
          // right={"0"}
          // bottom={"0"}
          // marginTop={"auto"}
          // transform={"translateY(50%)"}
        />
      </Parallax>
    </Box>
  </Flex>
);

export default HomeFooter;
