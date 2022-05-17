/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Box, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import Image from "../../../../../components/actions/NextChakraImg";
import Octopus from "./Octopus";

// Chakra imports
// Assets

export default function Banner(props) {
  const [like, setLike] = useState(false);
  const { image } = props;
  const bgGradient =
    "linear-gradient(138.87deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 94.09%)";
  // Character Coloring
  const [bodyBase, setBodyBase] = useState("#ffffff"); // default: #71c6c1
  const [bodyShading, setBodyShading] = useState("#ffffff");
  const [tentacles, setTentacles] = useState("#ffffff");
  const [tentacleShading, setTentacleShading] = useState("#ffffff");
  const [eyeColor, setEyeColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  // Chakra Color Mode
  return (
    <Box maxW="100%" mb="20px" position="relative">
      {/* <Image src={image} w="100%" h="100%" borderRadius="20px" /> */}
      <Octopus
        bodyBase={bodyBase}
        bodyShading={bodyShading}
        tentacles={tentacles}
        tentacleShading={tentacleShading}
        eyeColor={eyeColor}
        backgroundColor={backgroundColor}
      />
      <Button
        position="absolute"
        bg={bgGradient}
        _hover={{
          bg: { bgGradient },
        }}
        _active={{
          bg: { bgGradient },
        }}
        _focus={{
          bg: { bgGradient },
        }}
        p="0px !important"
        top="30px"
        right="30px"
        borderRadius="50%"
        minW="60px"
        h="60px"
        onClick={() => {
          setLike(!like);
        }}
      >
        <Icon
          transition="0.2s linear"
          w="28px"
          h="28px"
          as={like ? IoHeart : IoHeartOutline}
          color="white"
        />
      </Button>
    </Box>
  );
}
