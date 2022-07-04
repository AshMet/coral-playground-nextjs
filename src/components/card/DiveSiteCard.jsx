/* eslint-disable react/prop-types */
// Chakra imports
import {
  Box,
  Button,
  chakra,
  Flex,
  Icon,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import Nft1 from "../../../public/img/home/clown_fish.jpeg";
import Image from "../actions/NextChakraImg";
// Custom components
import { CircProgressMini } from "components/charts/CircularProgress";

import Card from "./Card";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});
// Assets

export default function DiveSiteCard(props) {
  const { id, image, name, address, isLoading } = props;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");

  return (
    <ChakraBox
      layout
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <Card
        p="10px"
        boxShadow="0 5px 10px rgb(0 0 0 / 5%)"
        _hover={{
          boxShadow: "0.1em 0.1em 3em rgba(0,0,0,0.3)",
          transform: "scale(1.01)",
        }}
      >
        <Flex direction={{ base: "column" }} justify="center">
          {id && (
            <Link href={`/diving/dive_sites/${id}`}>
              <Box position="relative">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Image
                    src={image || Nft1}
                    width="300"
                    height="300"
                    borderRadius="20px"
                  />
                )}
                <Button
                  position="absolute"
                  bg="white"
                  _hover={{ bg: "whiteAlpha.900" }}
                  _active={{ bg: "white" }}
                  _focus={{ bg: "white" }}
                  p="0px !important"
                  top="14px"
                  right="14px"
                  borderRadius="50%"
                  minW="36px"
                  h="36px"
                  onClick={() => {
                    setLike(!like);
                  }}
                >
                  <Icon
                    transition="0.2s linear"
                    w="20px"
                    h="20px"
                    as={like ? IoHeart : IoHeartOutline}
                    color="brand.500"
                  />
                </Button>
              </Box>
            </Link>
          )}
          <Flex
            flexDirection="column"
            justify="space-between"
            h="100%"
            p="10px"
          >
            <Flex
              justify="space-between"
              direction={{
                base: "row",
                md: "column",
                lg: "row",
                xl: "column",
                "2xl": "row",
              }}
              mb="auto"
            >
              <Flex direction="column">
                <Text
                  color={textColor}
                  fontSize={{
                    base: "xl",
                    md: "lg",
                    lg: "lg",
                    xl: "lg",
                    "2xl": "md",
                    "3xl": "lg",
                  }}
                  mb="5px"
                  fontWeight="bold"
                  me="14px"
                >
                  {name}
                </Text>
                <Text
                  color="secondaryGray.600"
                  fontSize={{
                    base: "sm",
                  }}
                  fontWeight="400"
                  me="14px"
                >
                  {address}
                </Text>
                <SimpleGrid columns={3} spacing="40px">
                  <Box w="35px">
                    <CircProgressMini step="DEP" percentage={80} />
                  </Box>
                  <Box w="35px">
                    <CircProgressMini step="VIS" percentage={30} />
                  </Box>
                  <Box w="35px">
                    <CircProgressMini step="CUR" percentage={60} />
                  </Box>
                </SimpleGrid>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </ChakraBox>
  );
}
