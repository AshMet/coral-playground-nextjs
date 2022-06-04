// Chakra imports
import { chakra } from "@chakra-ui/react";
import NextImage from "next/image";

const Image = chakra(NextImage, {
  baseStyle: { maxH: 120, maxW: 120 },
  shouldForwardProp: (prop) =>
    [
      "src",
      "alt",
      "layout",
      "quality",
      "placeholder",
      "blurDataURL",
      "loader ",
      "width",
      "height",
      "h",
      "w",
    ].includes(prop),
});

export default Image;
