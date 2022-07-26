/* eslint-disable react/prop-types */
// Chakra imports
import {
  Badge,
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

import Image from "../actions/NextChakraImg";
// Custom components
import { CircProgressMini } from "components/charts/CircularProgress";

import Card from "./Card";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});
// Assets

export default function DiveSiteCard(props) {
  const {
    id,
    image,
    name,
    address,
    tagList,
    maxVisibility,
    current,
    depth,
    type,
    isLoading,
  } = props;
  const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const bgImg =
    type === "dive_site"
      ? "/img/diving/dive_site_bg.png"
      : "/img/diving/dive_centre_bg.jpg";
  const siteUrl =
    type === "dive_site"
      ? `/diving/dive_sites/${id}`
      : `/diving/dive_centres/${id}`;

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
            <Link href={siteUrl}>
              <Box position="relative" cursor="pointer">
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Image
                    src={image || bgImg}
                    width="300"
                    height="200"
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
                {type === "dive_site" && (
                  <Box>
                    <Flex wrap="wrap" gap={1}>
                      {tagList?.map((tag) => (
                        <Badge
                          colorScheme="purple"
                          borderRadius="15px"
                          display="flex"
                          px={1}
                          py={1}
                          justifyContent="center"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </Flex>
                    <SimpleGrid columns={3} spacing="40px">
                      {depth && (
                        <Box w="35px" mt="10px">
                          <CircProgressMini title="DEP" value={depth} />
                        </Box>
                      )}
                      {maxVisibility && (
                        <Box w="35px" mt="10px">
                          <CircProgressMini title="VIS" value={maxVisibility} />
                        </Box>
                      )}
                      {current && (
                        <Box w="35px" mt="10px">
                          <CircProgressMini title="CUR" value={current} />
                        </Box>
                      )}
                    </SimpleGrid>
                  </Box>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </ChakraBox>
  );
}
