// Chakra imports
import { chakra } from "@chakra-ui/react";
import NextImage from "next/image";

const Image = chakra(NextImage, {
  baseStyle: { maxH: 120, maxW: 120 },
  shouldForwardProp: (prop) =>
    [
      "src",
      "alt",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader ",
      "width",
      "height",
    ].includes(prop),
});

export default Image;
