/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
// Chakra imports
import { Box, Flex, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
// import React from "react";

import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import Footer from "components/footer/FooterAuthCentered";
// Custom components
import Navbar from "components/navbar/NavbarAuth";

function AuthPricing(props) {
  const { children, title, description, image, contentTop, contentBottom } =
    props;
  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
      mx={{ base: "10px", lg: "0px" }}
      minH="100vh"
    >
      <Box
        position="absolute"
        minH={{ base: "60vh", md: "60vh" }}
        maxH={{ base: "60vh", md: "60vh" }}
        w={{ md: "calc(100vw)" }}
        maxW={{ md: "calc(100vw)" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={image}
        bgSize="cover"
        mx={{ md: "auto" }}
      />
      <Navbar secondaryNavbar={false} />
      <Flex
        w={{ base: "100%", md: "max-content" }}
        p={{ base: "10px", md: "50px" }}
        h="max-content"
        mx="auto"
        maxW="100%"
        mt={contentTop}
        mb={contentBottom}
      >
        {title && description ? (
          <Flex
            direction="column"
            textAlign="center"
            justifyContent="center"
            align="center"
            mt="125px"
            mb="30px"
          >
            <Text fontSize="4xl" color="white" fontWeight="bold">
              {title}
            </Text>
            <Text
              fontSize="md"
              color="white"
              fontWeight="normal"
              mt="10px"
              mb="26px"
              w={{ base: "90%", sm: "60%", lg: "40%", xl: "333px" }}
            >
              {description}
            </Text>
          </Flex>
        ) : null}
        {children}
      </Flex>
      <Footer />
      <FixedPlugin />
    </Flex>
  );
}
// PROPS

AuthPricing.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.any,
};

export default AuthPricing;
