/* eslint-disable react/prop-types */
// Chakra imports
import {
  Badge,
  Box,
  Button,
  chakra,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import Image from "../actions/NextChakraImg";
import BlogAuthor from "components/pages/blog/BlogAuthor";
// Custom components
// import { CircProgressMini } from "components/charts/CircularProgress";

import Card from "./Card";

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});
// Assets

export default function BlogCard(props) {
  const {
    id,
    imgUrl,
    author,
    articleUrl,
    tags,
    summary,
    date,
    title,
    ...rest
  } = props;
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
        maxW="400px"
        boxShadow="0 5px 10px rgb(0 0 0 / 5%)"
        _hover={{
          boxShadow: "0.1em 0.1em 3em rgba(0,0,0,0.3)",
          transform: "scale(1.01)",
        }}
        {...rest}
      >
        <Flex direction={{ base: "column" }} justify="center">
          <Link href={articleUrl}>
            <Box position="relative" cursor="pointer">
              <Box width="300" height="200">
                <Image src={imgUrl} borderRadius="20px" layout="fill" />
              </Box>
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
                  fontWeight="bold"
                  me="14px"
                >
                  {title}
                </Text>
                {/* <Text color={textColor} fontSize="md" mb="5px" me="14px">
                  {author}
                </Text> */}
                <Text
                  color="secondaryGray.600"
                  fontSize={{
                    base: "sm",
                  }}
                  fontWeight="400"
                  me="14px"
                  mt={2}
                >
                  {summary}
                </Text>
                <Box mt={5}>
                  <BlogAuthor name={author} date={new Date(date)} />
                  <Flex wrap="wrap" gap={1} mt={5}>
                    {tags?.map((tag) => (
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
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </ChakraBox>
  );
}
