/* eslint-disable import/no-cycle */
/* eslint-disable func-names */
/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */

// Chakra imports
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  // Image,
  Link,
  Menu,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useColorMode,
  useDisclosure,
  SimpleGrid,
} from "@chakra-ui/react";
import Image from "next/image";
// import React from "react";
import PropTypes from "prop-types";
// Custom components
import { GoChevronDown } from "react-icons/go";

import SidebarContext from "../../contexts/SidebarContext";
import routes from "../../routes";
// import { NavLink } from "react-router-dom";
import NavLink from "../navLinks/NavLink";
import { SidebarResponsive } from "../sidebar/Sidebar";

// Assets
// import dropdownMain from "assets/img/layout/dropdownMain.png";
// import dropdown from "assets/img/layout/dropdown.png";

export default function AuthNavbar(props) {
  const { logo, logoText, secondary, sidebarWidth, ...rest } = props;
  const { colorMode } = useColorMode();
  // Menu States
  const {
    isOpen: isOpenAuth,
    onOpen: onOpenAuth,
    onClose: onCloseAuth,
  } = useDisclosure();
  const {
    isOpen: isOpenDashboards,
    onOpen: onOpenDashboards,
    onClose: onCloseDashboards,
  } = useDisclosure();
  // const {
  //   isOpen: isOpenMain,
  //   onOpen: onOpenMain,
  //   onClose: onCloseMain,
  // } = useDisclosure();
  const {
    isOpen: isOpenNft,
    onOpen: onOpenNft,
    onClose: onCloseNft,
  } = useDisclosure();
  // Menus
  function getLinks(routeName) {
    const foundRoute = routes.filter(function (route) {
      return route.items && route.name === routeName;
    });
    console.log(foundRoute);
    return foundRoute[0]?.items;
  }
  function getLinksCollapse(routeName) {
    const foundRoute = routes?.filter(function (route) {
      return route?.items && route?.name === routeName;
    });

    return foundRoute[0].items.filter(function (link) {
      return link.collapse === true;
    });
  }
  const authObject = getLinksCollapse("Get Started");
  // const mainObject = getLinksCollapse("Main Pages");
  const dashboardsObject = getLinks("Activities");
  const nftsObject = getLinks("NFTs");
  // const logoColor = useColorModeValue("white", "white");
  // Chakra color mode

  const textColor = useColorModeValue("navy.700", "white");
  const menuBg = useColorModeValue("white", "navy.900");
  const mainText = "#fff";
  const navbarBg = "none";
  const navbarShadow = "initial";
  const bgButton = "white";
  const colorButton = "brand.500";
  const navbarPosition = "absolute";

  let brand = (
    <Link
      href={`${process.env.PUBLIC_URL}/#/`}
      target="_blank"
      display="flex"
      lineHeight="100%"
      fontWeight="bold"
      justifyContent="center"
      alignItems="center"
      color={mainText}
    >
      <Stack direction="row" spacing="12px" align="center" justify="center">
        {/* <HorizonLogo h="26px" w="175px" color={logoColor} /> */}
        <Image src="/svg/coral-logo.svg" width="200px" height="45px" />
      </Stack>
      <Text fontsize="sm" mt="3px">
        {logoText}
      </Text>
    </Link>
  );
  if (props.secondary === true) {
    brand = (
      <Link
        minW="175px"
        href={`${process.env.PUBLIC_URL}/#/`}
        target="_blank"
        display="flex"
        lineHeight="100%"
        fontWeight="bold"
        justifyContent="center"
        alignItems="center"
        color={mainText}
      >
        <Image src="/svg/coral-logo.svg" width="200px" height="45px" />
        {/* <HorizonLogo h="26px" w="175px" my="32px" color={logoColor} /> */}
      </Link>
    );
    // mainText = useColorModeValue("gray.700", "gray.200");
    // navbarBg = useColorModeValue("white", "navy.800");
    // navbarShadow = useColorModeValue(
    //   "0px 7px 23px rgba(0, 0, 0, 0.05)",
    //   "none"
    // );
    // bgButton = useColorModeValue("gray.700", "white");
    // colorButton = useColorModeValue("white", "gray.700");
    // navbarPosition = "fixed";
  }
  const createNftsLinks = (routes) => {
    return routes?.map((link, key) => {
      return (
        <NavLink
          key={key}
          to={link.layout + link.path}
          style={{ maxWidth: "max-content" }}
        >
          <Text color="gray.400" fontSize="sm" fontWeight="500">
            {link.name}
          </Text>
        </NavLink>
      );
    });
  };
  const createDashboardsLinks = (routes) => {
    return routes?.map((link, key) => {
      return (
        <NavLink
          key={key}
          to={link.layout + link.path}
          style={{ maxWidth: "max-content" }}
        >
          <Text color="gray.400" fontSize="sm" fontWeight="500">
            {link.name}
          </Text>
        </NavLink>
      );
    });
  };
  // const createMainLinks = (routes) => {
  //   return routes.map((link, key) => {
  //     if (link.collapse === true) {
  //       return (
  //         <Stack key={key} direction="column" maxW="max-content">
  //           <Stack
  //             direction="row"
  //             spacing="0px"
  //             align="center"
  //             cursor="default"
  //           >
  //             <Text
  //               textTransform="uppercase"
  //               fontWeight="bold"
  //               fontSize="sm"
  //               me="auto"
  //               color={textColor}
  //             >
  //               {link.name}
  //             </Text>
  //           </Stack>
  //           <Stack direction="column" bg={menuBg}>
  //             {createMainLinks(link.items)}
  //           </Stack>
  //         </Stack>
  //       );
  //     }
  //     return (
  //       <NavLink key={key} to={link.layout + link.path}>
  //         <Text color="gray.400" fontSize="sm" fontWeight="normal">
  //           {link.name}
  //         </Text>
  //       </NavLink>
  //     );
  //   });
  // };
  const createAuthLinks = (routes) => {
    return routes?.map((link, key) => {
      if (link.collapse === true) {
        return (
          <Stack key={key} direction="column" maxW="max-content">
            <Stack
              direction="row"
              spacing="0px"
              align="center"
              cursor="default"
            >
              <Text
                textTransform="uppercase"
                fontWeight="bold"
                fontSize="sm"
                me="auto"
                color={textColor}
              >
                {link.name}
              </Text>
            </Stack>
            <Stack direction="column" bg={menuBg}>
              {createAuthLinks(link.items)}
            </Stack>
          </Stack>
        );
      }
      return (
        <NavLink key={key} to={link.layout + link.path}>
          <Text color="gray.400" fontSize="sm" fontWeight="normal">
            {link.name}
          </Text>
        </NavLink>
      );
    });
  };
  const linksAuth = (
    <HStack display={{ sm: "none", lg: "flex" }} spacing="20px">
      <Stack
        direction="row"
        spacing="4px"
        align="center"
        color="#fff"
        fontWeight="bold"
        onMouseEnter={onOpenDashboards}
        onMouseLeave={onCloseDashboards}
        cursor="pointer"
        position="relative"
      >
        <Text fontSize="sm" color={mainText}>
          Activities
        </Text>
        <Box>
          <Icon
            mt="8px"
            as={GoChevronDown}
            color={mainText}
            w="14px"
            h="14px"
            fontWeight="2000"
          />
        </Box>
        <Menu isOpen={isOpenDashboards}>
          <MenuList
            bg={menuBg}
            p="22px"
            cursor="default"
            borderRadius="15px"
            position="absolute"
            w="max-content"
            top="30px"
            left="-10px"
            display="flex"
          >
            <SimpleGrid columns="1" gap="8px" w="150px">
              {createDashboardsLinks(dashboardsObject)}
            </SimpleGrid>
            {/* <Image w='110px' h='110px' borderRadius='16px' src={dropdown} /> */}
          </MenuList>
        </Menu>
      </Stack>
      <Stack
        direction="row"
        spacing="4px"
        align="center"
        color="#fff"
        fontWeight="bold"
        onMouseEnter={onOpenNft}
        onMouseLeave={onCloseNft}
        cursor="pointer"
        position="relative"
      >
        <Text fontSize="sm" color={mainText}>
          NFTs
        </Text>
        <Box>
          <Icon
            mt="8px"
            as={GoChevronDown}
            color={mainText}
            w="14px"
            h="14px"
            fontWeight="2000"
          />
        </Box>
        <Menu isOpen={isOpenNft}>
          <MenuList
            bg={menuBg}
            p="22px"
            cursor="default"
            borderRadius="15px"
            position="absolute"
            w="max-content"
            top="30px"
            left="-10px"
            display="flex"
          >
            <SimpleGrid columns="1" gap="8px" w="150px">
              {createNftsLinks(nftsObject)}
            </SimpleGrid>
            {/* <Image w='110px' h='110px' borderRadius='16px' src={dropdown} /> */}
          </MenuList>
        </Menu>
      </Stack>
      {/* <Stack
        direction="row"
        spacing="4px"
        align="center"
        color="#fff"
        fontWeight="bold"
        onMouseEnter={onOpenMain}
        onMouseLeave={onCloseMain}
        cursor="pointer"
        position="relative"
      >
        <Text fontSize="sm" color={mainText}>
          Main Pages
        </Text>
        <Box>
          <Icon
            mt="8px"
            as={GoChevronDown}
            color={mainText}
            w="14px"
            h="14px"
            fontWeight="2000"
          />
        </Box>
        <Menu isOpen={isOpenMain}>
          <MenuList
            bg={menuBg}
            p="18px"
            ps="24px"
            cursor="default"
            borderRadius="15px"
            position="absolute"
            w="max-content"
            top="30px"
            left="-10px"
            display="flex"
          >
            <SimpleGrid
              me="50px"
              columns="2"
              align="start"
              minW="280px"
              gap="24px"
            >
              {createMainLinks(mainObject)}
            </SimpleGrid>
            <Image borderRadius='16px' src={dropdownMain} />
          </MenuList>
        </Menu>
      </Stack> */}
      <Stack
        direction="row"
        spacing="4px"
        align="center"
        color="#fff"
        fontWeight="bold"
        onMouseEnter={onOpenAuth}
        onMouseLeave={onCloseAuth}
        cursor="pointer"
        position="relative"
      >
        <Text fontSize="sm" color={mainText}>
          Getting Started
        </Text>
        <Box>
          <Icon
            mt="8px"
            as={GoChevronDown}
            color={mainText}
            w="14px"
            h="14px"
            fontWeight="2000"
          />
        </Box>
        <Menu isOpen={isOpenAuth}>
          <MenuList
            bg={menuBg}
            p="22px"
            cursor="default"
            borderRadius="15px"
            position="absolute"
            top="30px"
            left="-10px"
            display="flex"
            w="max-content"
          >
            <SimpleGrid
              me="20px"
              columns="2"
              align="start"
              minW="180px"
              gap="24px"
            >
              {createAuthLinks(authObject)}
            </SimpleGrid>
            {/* <Image borderRadius='16px' src={dropdown} /> */}
          </MenuList>
        </Menu>
      </Stack>
    </HStack>
  );

  return (
    <SidebarContext.Provider value={{ sidebarWidth }}>
      <Flex
        position={navbarPosition}
        top="16px"
        left="50%"
        transform="translate(-50%, 0px)"
        background={navbarBg}
        boxShadow={navbarShadow}
        borderRadius="15px"
        px="16px"
        py="22px"
        mx="auto"
        width="1044px"
        maxW="90%"
        alignItems="center"
        zIndex="3"
      >
        <Flex w="100%" justifyContent={{ sm: "start", lg: "space-between" }}>
          {brand}
          <Box
            ms={{ base: "auto", lg: "0px" }}
            display={{ base: "flex", lg: "none" }}
            justifyContent="center"
            alignItems="center"
          >
            <SidebarResponsive
              logo={
                <Stack
                  direction="row"
                  spacing="12px"
                  align="center"
                  justify="center"
                >
                  <Box
                    w="1px"
                    h="20px"
                    bg={colorMode === "dark" ? "white" : "gray.700"}
                  />
                </Stack>
              }
              logoText={props.logoText}
              secondary={props.secondary}
              routes={routes}
              {...rest}
            />
          </Box>
          {linksAuth}
          <Link href="https://www.horizon-ui.com/pro">
            <Button
              bg={bgButton}
              color={colorButton}
              fontSize="xs"
              variant="no-effects"
              borderRadius="50px"
              px="45px"
              display={{
                sm: "none",
                lg: "flex",
              }}
            >
              Sign Up
            </Button>
          </Link>
        </Flex>
      </Flex>
    </SidebarContext.Provider>
  );
}

AuthNavbar.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  brandText: PropTypes.string,
};
