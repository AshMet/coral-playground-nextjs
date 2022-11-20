import {
  Flex,
  Link,
  Box,
  Icon,
  Badge,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";

import Image from "../actions/NextChakraImg";
import { HSeparator } from "components/separator/Separator";
// import * as gtag from "lib/data/gtag";

export default function Footer() {
  // const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("white", "white"); // "secondaryGray.700"
  const textFooter = useColorModeValue("white", "white"); // "secondaryGray.900"
  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: "column",
      }}
      alignItems="start"
      justifyContent="space-between"
      pb="30px"
      position="relative"
      backgroundImage="/img/diving/footer_bg.jpg"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="left"
      background
    >
      <Flex
        px={{
          base: "20px",
          xl: "unset",
        }}
        bg="linear-gradient(180deg, #603CFF 0%, #3609FF 100%)"
        w="100%"
        bgPosition="center"
        h={{ base: "300px", lg: "250px" }}
        bgSize="cover"
      >
        <Flex
          my="auto"
          align={{ base: "start", lg: "center" }}
          w="100%"
          maxW="1170px"
          mx="auto"
          justifyContent="space-between"
          flexDirection={{
            base: "column",
            lg: "row",
          }}
        >
          <Flex
            flexDirection={{
              base: "column",
              lg: "row",
            }}
          >
            <Icon
              me={{ base: "0px", lg: "40px" }}
              as={FaInstagram}
              color="white"
              w="80px"
              h="80px"
            />
            <Box>
              <Text
                fontSize={{ base: "22px", md: "30px" }}
                color="white"
                fontWeight="700"
              >
                Follow Us On Instagram
              </Text>
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                mb={{ base: "20px", lg: "unset" }}
                color="white"
                fontWeight="700"
              >
                For upcoming dive trips, local dive content and general udpates
              </Text>
            </Box>
          </Flex>
          <Link href="https://instagram.com/coral.playground/">
            <Button
              ms={{ base: "0px", lg: "auto" }}
              bg="white"
              color="brand.500"
              _hover={{ bg: "whiteAlpha.800" }}
              _focus={{ bg: "whiteAlpha.900" }}
              _active={{ bg: "white" }}
              borderRadius="12px"
              w="276px"
              h="54px"
              // onClick={gtag.event({
              //   action: "follow-instagram",
              //   category: "button",
              //   label: "Follow us on Instagram",
              //   // value: ,
              // })}
            >
              Follow on Instagram
            </Button>
          </Link>
        </Flex>
      </Flex>
      <Flex
        justifyContent="space-between"
        mt="100px"
        w={{ base: "100%", xl: "1170px" }}
        flexDirection={{
          base: "column",
          lg: "row",
        }}
        px={{
          base: "20px",
          xl: "0px",
        }}
        maxW={{ base: "100%", xl: "1170px" }}
        mx="auto"
      >
        <Box
          maxW={{
            base: "100%",
            lg: "360px",
          }}
        >
          <Image
            src="/svg/coral-logo.svg"
            width="200px"
            height="45px"
            filter="invert(100%) sepia(0%) saturate(7500%) hue-rotate(70deg) brightness(99%) contrast(107%)"
          />
          <Text
            lineHeight="180%"
            fontSize="md"
            color={textColorSecondary}
            fontWeight="400"
            mt="10px"
          >
            Like what we&apos;re building and want to be an early member on a
            project with a strong long-term vision? We&apos;re looking to expand
            our team so get in touch to see how you can get involved
          </Text>
        </Box>
        <Flex
          direction={{ base: "column", md: "row" }}
          w={{ base: "100%", md: "100%", lg: "100%", xl: "690px" }}
        >
          <Flex
            direction="column"
            me={{ base: "20px", md: "60px", lg: "14px", xl: "60px" }}
            mt={{ base: "30px", md: "40px", lg: "0px" }}
          >
            <Text mb="20px" fontSize="lg" color={textFooter} fontWeight="700">
              Resources
            </Text>
            <Link
              href="/"
              fontSize="md"
              color={textColorSecondary}
              fontWeight="400"
              mb="20px"
            >
              Company
            </Link>
            <Flex>
              <Link
                href="/"
                fontSize="md"
                color={textColorSecondary}
                fontWeight="400"
                mb="20px"
              >
                Careers
                <Badge
                  colorScheme="green"
                  ms="6px"
                  py="2px"
                  px="6px"
                  borderRadius="10px"
                >
                  New
                </Badge>
              </Link>
            </Flex>
          </Flex>
          <Flex
            direction="column"
            me={{ base: "20px", md: "80px", lg: "50px", xl: "60px" }}
            mt={{ base: "30px", md: "40px", lg: "0px" }}
          >
            <Text mb="20px" fontSize="lg" color={textFooter} fontWeight="700">
              Help & Support
            </Text>
            <Link
              href="/faq/divers"
              fontSize="md"
              color={textColorSecondary}
              fontWeight="400"
              mb="20px"
            >
              FAQs
            </Link>
            <Link
              href="/faq/contact"
              fontSize="md"
              color={textColorSecondary}
              fontWeight="400"
              mb="20px"
            >
              Contact Us
            </Link>
            <Link
              href="mailto:info@coralplayground.com"
              fontSize="md"
              color={textColorSecondary}
              fontWeight="400"
              mb="20px"
            >
              Support
            </Link>
          </Flex>
          <Flex
            direction="column"
            me={{ base: "20px", md: "80px", lg: "50px", xl: "60px" }}
            mt={{ base: "30px", md: "40px", lg: "0px" }}
          >
            <Text mb="20px" fontSize="lg" color={textFooter} fontWeight="700">
              Social Media
            </Text>
            <Link
              href="https://instagram.com/coral.playground/"
              fontSize="md"
              color={textColorSecondary}
              fontWeight="400"
              mb="20px"
              // onClick={gtag.event({
              //   action: "follow-instagram",
              //   category: "button",
              //   label: "Follow us on Instagram",
              //   // value: ,
              // })}
            >
              Instagram
            </Link>
            <Link
              href="https://www.facebook.com/coral.playground"
              fontSize="md"
              color={textColorSecondary}
              fontWeight="400"
              mb="20px"
              // onClick={gtag.event({
              //   action: "follow-facebook",
              //   category: "button",
              //   label: "Follow us on Facebook",
              //   // value: ,
              // })}
            >
              Facebook
            </Link>

            {/* <Link
              href="https://twitter.com/coral.playground"
              fontSize="md"
              color={textColorSecondary}
              fontWeight="400"
            >
              Twitter
            </Link> */}
          </Flex>
          <Flex direction="column" mt={{ base: "30px", md: "40px", lg: "0px" }}>
            <Text mb="20px" fontSize="lg" color={textFooter} fontWeight="700">
              Legal Resources
            </Text>
            <Link
              href="/legal/terms"
              fontSize="md"
              color={textColorSecondary}
              fontWeight="400"
              mb="20px"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/legal/privacy"
              fontSize="md"
              color={textColorSecondary}
              fontWeight="400"
              mb="20px"
            >
              Privacy Policy
            </Link>
          </Flex>
        </Flex>
      </Flex>
      <HSeparator mt="75px" mb="50px" maxW="1170px" mx="auto" />
      <Flex mx="auto">
        <Text me="4px" textColor={textColorSecondary}>
          © 2022 Coral Playground. All Rights Reserved.
        </Text>
      </Flex>
    </Flex>
  );
}
