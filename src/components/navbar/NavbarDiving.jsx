/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */

// Chakra Imports
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Hide,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import NavbarDivingLinks from "./NavbarDivingLinks";

export default function NavbarDiving(props) {
  const [scrolled, setScrolled] = useState(false);

  const { secondary, message, brandText, mini, setMini, hovered } = props;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  const mainText = useColorModeValue("navy.700", "white");
  const secondaryText = useColorModeValue("gray.700", "white");
  const navbarPosition = "fixed";
  const navbarFilter = "none";
  const navbarBackdrop = "blur(20px)";
  const navbarShadow = "none";
  const navbarBg = useColorModeValue("whiteAlpha.500", "rgba(11,20,55,0.5)");
  const navbarBorder = "transparent";
  const secondaryMargin = "0px";
  const paddingX = "15px";
  const gap = "0px";
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);

    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  });

  return (
    <Box
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="16px"
      borderWidth="1.5px"
      borderStyle="solid"
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      display={secondary ? "block" : "flex"}
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="8px"
      right={{ base: "12px", md: "30px", lg: "30px", xl: "30px" }}
      px={{
        sm: paddingX,
        md: "10px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top={{ base: "12px", md: "16px", xl: "18px" }}
      w={
        mini === false || hovered === true
          ? {
              base: "calc(100vw - 6%)",
              md: "calc(100vw - 8%)",
              lg: "calc(100vw - 6%)",
              xl: "calc(100vw - 350px)",
              "2xl": "calc(100vw - 365px)",
            }
          : {
              base: "calc(100vw - 6%)",
              md: "calc(100vw - 8%)",
              lg: "calc(100vw - 6%)",
              xl: "calc(100vw - 185px)",
              "2xl": "calc(100vw - 200px)",
            }
      }
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
        mb={gap}
      >
        <Hide below="md">
          <Box mb={{ sm: "8px", md: "0px" }}>
            <Breadcrumb>
              <BreadcrumbItem color={secondaryText} fontSize="sm" mb="5px">
                <BreadcrumbLink href="#" color={secondaryText}>
                  Pages
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem color={secondaryText} fontSize="sm">
                <BreadcrumbLink href="#" color={secondaryText}>
                  {brandText}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            {/* Here we create navbar brand, based on route name */}
            <Link
              color={mainText}
              href="#"
              bg="inherit"
              borderRadius="inherit"
              fontWeight="bold"
              fontSize="34px"
              _hover={{ color: { mainText } }}
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
            >
              {brandText}
            </Link>
          </Box>
        </Hide>
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <NavbarDivingLinks
            mini={mini}
            setMini={setMini}
            secondary={props.secondary}
            onOpen={props.onOpen}
            logoText={props.logoText}
            fixed={props.fixed}
            scrolled={scrolled}
          />
        </Box>
      </Flex>
      {secondary ? <Text color="white">{message}</Text> : null}
    </Box>
  );
}

NavbarDiving.propTypes = {
  brandText: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
