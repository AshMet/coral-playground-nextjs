import { Image, Box, Flex, Spacer } from "@chakra-ui/react";
import { Parallax } from "react-scroll-parallax";

export default function HomeJellyfish() {
  return (
    <Box>
      <Flex direction="row">
        <Parallax
          easing={[1, 0.45, 0.2, 1.34]}
          translateX={[0, 200]}
          translateY={[0, -230]}
        >
          <Box>
            <Image
              src="/img/home/parallax/jellyfish_3d.png"
              alt="Jellyfish"
              w="80px"
              minW="80px"
              mb={2}
              transform="rotate(0.1turn)"
            />
          </Box>
          <Spacer />
        </Parallax>
        <Parallax
          easing={[1, -0.75, 0.2, 1.34]}
          translateX={[0, 150]}
          translateY={[-100, 60]}
        >
          <Box>
            <Image
              src="/img/home/parallax/jellyfish_3d.png"
              alt="Jenny Wilson"
              w="90px"
              minW="90px"
              mb={2}
              transform="rotate(0.4turn)"
            />
          </Box>
        </Parallax>
        {/* <Parallax easing={[0.9, -0.75, 0.5, 1.34]} translateX={[0, -100]} translateY={[-220, 0]}>
            <Box>
                <Image  
                src={ JellyfishImg }
                alt={'Jenny Wilson'}
                w={'100px'}
                minW={'100px'}
                mb={2}
                transform={'rotate(0.6turn)'}
                />
            </Box>
        </Parallax> */}
      </Flex>
    </Box>
  );
}
