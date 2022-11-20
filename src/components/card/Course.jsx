/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
// Chakra imports
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Button,
  Icon,
  Center,
} from "@chakra-ui/react";
import { BsArrowRight } from "react-icons/bs";

import Image from "components/actions/NextChakraImg";
import Card from "components/card/Card";
// interface CourseProps {
//   imageUrl: string;
//   title: string;
//   description: string;
//   agency: string;
//   price: string;
//   duration: string;
//   bgBox: string;
//   priceId: string;
// }

export default function Course(props) {
  const {
    id,
    imageUrl,
    title,
    description,
    agency,
    duration,
    category,
    price,
    priceId,
    setPrice,
    setPriceId,
    setCourseId,
    setCourseName,
    selected,
  } = props;
  const textColor = useColorModeValue("navy.700", "white");
  const selectedTextColor = "white";
  const selectedBgColor = useColorModeValue("brand.500", "brand.400");
  const textBrand = useColorModeValue("brand.500", "white");

  function getBgColor(cat) {
    if (cat === "recreational") {
      return "linear-gradient(109.6deg, #FF9966 17.44%, #FF5E62 78.63%)";
    }
    if (cat === "professional") {
      return "linear-gradient(115.07deg, #29E9F5 -9.41%, #7A64FF 28.04%, #FF508B 71.85%, #FD6D53 112.49%, #FD6D53 112.49%)";
    }
    return "linear-gradient(292.37deg, #92FE9D 10.84%, #00C9FF 95.27%)";
  }

  return (
    <Card
      p="20px"
      h="max-content"
      minH={{ md: "450px", xl: "auto" }}
      bg={selected && selectedBgColor}
      onClick={() => {
        setCourseName(title);
        setCourseId(id);
        setPrice(price);
        setPriceId(priceId);
      }}
    >
      <Flex direction={{ base: "column", md: "column", xl: "row" }}>
        <Flex direction="column" pr="20px">
          <Box
            bg={getBgColor(category)}
            minW={{ base: "100%", xl: "270px" }}
            minH={{ base: "200px", xl: "270px" }}
            borderRadius="20px"
            me="34px"
            width="100%"
            height="100%"
            position="relative"
          >
            <Center>
              <Image
                src={imageUrl || "/svg/certifications/open_water_cert.svg"}
                height="350px"
                width="270px"
              />
            </Center>
          </Box>
        </Flex>
        <Flex
          justify="space-between"
          flexDirection="column"
          mb="auto"
          pb={{ base: "0px", md: "0px" }}
        >
          <Flex display={{ base: "block", xl: "flex" }}>
            <Box direction="column" w="100%" mb="5px">
              <Flex align="center" mb="20px">
                <Text
                  color={selected ? selectedTextColor : textColor}
                  fontSize="lg"
                  fontWeight="700"
                  lineHeight="100%"
                >
                  {title}
                </Text>
                <Button
                  p="0px"
                  ms="auto"
                  variant="no-hover"
                  bg="transparent"
                  cursor="pointer"
                  _hover={{ transform: "translate(4px)" }}
                >
                  <Text
                    fontSize="sm"
                    color={selected ? selectedTextColor : textColor}
                    fontWeight="bold"
                  >
                    Select This
                  </Text>
                  <Icon
                    as={BsArrowRight}
                    w="18px"
                    h="18px"
                    color={selected ? selectedTextColor : textColor}
                    transition="all .3s ease"
                    ms=".3rem"
                  />
                </Button>
              </Flex>
              <Text
                color="secondaryGray.600"
                fontSize={{
                  base: "md",
                }}
                fontWeight="400"
                me="14px"
                mb="10px"
              >
                {description}
              </Text>
              <Flex justify="space-between" w="100%">
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={selected ? selectedTextColor : textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    {agency}
                  </Text>
                  <Text
                    color={selected ? selectedTextColor : textBrand}
                    fontSize="sm"
                    fontWeight="normal"
                  >
                    Association
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={selected ? selectedTextColor : textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    {duration}
                  </Text>
                  <Text
                    color={selected ? selectedTextColor : textBrand}
                    fontSize="sm"
                    fontWeight="normal"
                  >
                    Duration
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color={selected ? selectedTextColor : textColor}
                    fontWeight="bold"
                    mb="6px"
                  >
                    €{(price / 100).toFixed(0)}
                  </Text>
                  <Text
                    color={selected ? selectedTextColor : textBrand}
                    fontSize="sm"
                    fontWeight="normal"
                  >
                    Price
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
