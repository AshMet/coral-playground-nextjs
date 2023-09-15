/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
// Chakra imports
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";
// import { usePostHog } from "posthog-js/react";
// import slugify from "slugify";

import Image from "../actions/NextChakraImg";
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
    minDepth,
    maxDepth,
    minVisibility,
    maxVisibility,
    minCurrent,
    maxCurrent,
    type,
    isLoading,
    ...rest
  } = props;
  // const posthog = usePostHog();
  // const [like, setLike] = useState(false);
  const textColor = useColorModeValue("navy.700", "white");
  const bgImg =
    type === "dive_site"
      ? "/img/diving/dive_site_bg.jpg"
      : "/img/diving/dive_centre_bg.jpg";
  // const siteUrl =
  //   type === "diveSite"
  //     ? `/dive_sites/${slugify(name.replace("&", ""), {
  //         lower: true,
  //         remove: /[*+~.()'"!:@]/g,
  //       })}`
  //     : `/dive_centres/${slugify(name.replace("&", ""), {
  //         lower: true,
  //         remove: /[*+~.()'"!:@]/g,
  //       })}`;

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
        as="a"
        minW="250px"
        {...rest}
      >
        <Flex direction={{ base: "column" }} justify="center">
          {id && (
            <Box
              position="relative"
              cursor="pointer"
              // onClick={() => cardClicked()}
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <Image
                  src={image || bgImg}
                  width="300"
                  height="200"
                  borderRadius="20px"
                  layout="responsive"
                />
              )}
              {/* <Button
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
                  </Button> */}
            </Box>
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
                {name && (
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
                )}
                {address && (
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
                )}
                {type === "diveSite" && (
                  <Box>
                    {/* <Flex wrap="wrap">
                      {tagList?.map((tag, index) => (
                        <Text p="0px" fontSize="xs">
                          {tag.toUpperCase()}
                          <Text as="span" mx={1}>
                            {index === tagList.length - 1 ? "" : "●"}
                          </Text>
                        </Text>
                      ))}
                    </Flex> */}
                    <SimpleGrid columns={3} spacing="40px">
                      {maxDepth && (
                        <Box w="35px" mt="10px">
                          <CircProgressMini title="DEP" value={maxDepth} />
                        </Box>
                      )}
                      {maxVisibility && (
                        <Box w="35px" mt="10px">
                          <CircProgressMini title="VIS" value={maxVisibility} />
                        </Box>
                      )}
                      {maxCurrent && (
                        <Box w="35px" mt="10px">
                          <CircProgressMini title="CUR" value={maxCurrent} />
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
