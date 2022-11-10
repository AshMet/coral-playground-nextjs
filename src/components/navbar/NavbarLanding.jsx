/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  Link,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  // useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoLogoInstagram, IoMenuOutline } from "react-icons/io5";
import { MdChevronRight } from "react-icons/md";

import { VSeparator } from "components/separator/Separator";

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);
  // const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);

    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  });

  const { secondary, message } = props;

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let textColor = useColorModeValue("secondaryGray.900", "white");
  const navbarPosition = "fixed";
  const navbarFilter = "none";
  let navbarBackdrop = "blur(20px)";
  const navbarShadow = "none";
  let navbarBg = useColorModeValue("whiteAlpha.500", "rgba(11,20,55,0.5)");
  const navbarBorder = "transparent";
  let secondaryMargin = "90px";
  const paddingX = "15px";
  const gap = "0px";
  const menuBg = useColorModeValue("white", "navy.800");
  const menuTextColor = useColorModeValue("navy.800", "white");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  if (scrolled) secondaryMargin = "0px";
  else secondaryMargin = "55px";
  if (!scrolled) navbarBackdrop = "unset";
  if (!scrolled) navbarBg = "transparent";
  if (!scrolled) textColor = "white";
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
      zIndex="5"
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
      left="50%"
      transform="translate(-50%,0px)"
      px={{
        sm: paddingX,
        md: "10px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top={{ base: "12px", md: "16px", xl: "18px" }}
      w={{
        base: "calc(100vw - 6%)",
        md: "calc(100vw - 8%)",
        lg: "calc(100vw - 6%)",
        xl: "calc(100vw - 250px)",
        "2xl": "1200px",
      }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "row",
          md: "row",
        }}
        alignItems="center"
        mb={gap}
      >
        <Link href="/">
          <Image src="/svg/coral-logo.svg" width="200px" height="45px" />
        </Link>
        <Flex ms="auto">
          <Link
            display={{ base: "none", lg: "block" }}
            href="/diving/home"
            color={textColor}
            fontSize="md"
            fontWeight="600"
            me="30px"
            my="auto"
          >
            Diving
          </Link>
          <Link
            display={{ base: "none", lg: "block" }}
            href="/nfts/home"
            color={textColor}
            fontSize="md"
            fontWeight="600"
            me="30px"
            my="auto"
          >
            NFTs
          </Link>
          <VSeparator
            me="14px"
            bg={textColor}
            display={{ base: "none", lg: "block" }}
          />
          <Link
            me="10px"
            my="auto"
            href="https://instagram.com/coral.playground/"
          >
            <Button
              variant="no-hover"
              h="max-content"
              w="max-content"
              bg="transparent"
              my="auto"
            >
              <Icon as={IoLogoInstagram} color={textColor} w="18px" h="18px" />
            </Button>
          </Link>
          <Menu>
            <MenuButton
              display={{ base: "block", lg: "none" }}
              p="0px !important"
              mt={{ base: "4px", md: "4px" }}
              maxH="20px"
              maxW="20px"
              me={{ base: "30px", lg: "0px" }}
              alignContent="end"
            >
              <Icon
                mt="2px"
                display={{ base: "block", lg: "none" }}
                as={IoMenuOutline}
                color={textColor}
                w="20px"
                h="20px"
                me="10px"
                _hover={{ cursor: "pointer" }}
              />
            </MenuButton>
            <MenuList
              boxShadow={shadow}
              p="0px"
              mt="10px"
              borderRadius="20px"
              bg={menuBg}
              border="none"
            >
              <Flex flexDirection="column" p="10px">
                <MenuItem
                  _hover={{ bg: "none" }}
                  _focus={{ bg: "none" }}
                  borderRadius="8px"
                  px="14px"
                >
                  <Link
                    href="/diving/home"
                    color={menuTextColor}
                    fontSize="md"
                    fontWeight="500"
                    me="30px"
                    my="auto"
                  >
                    Diving
                  </Link>
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "none" }}
                  _focus={{ bg: "none" }}
                  borderRadius="8px"
                  px="14px"
                >
                  <Link
                    href="/nfts/home"
                    color={menuTextColor}
                    fontSize="md"
                    fontWeight="500"
                    me="30px"
                    my="auto"
                  >
                    NFTs
                  </Link>
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "none" }}
                  _focus={{ bg: "none" }}
                  borderRadius="8px"
                >
                  <Link href="/diving/map">
                    <Button
                      variant="no-hover"
                      border="1px solid"
                      borderColor={menuTextColor}
                      color={menuTextColor}
                      fontSize="md"
                      borderRadius="12px"
                      bg="transparent"
                      my="auto"
                    >
                      Start Exploring for Free
                      <Icon
                        as={MdChevronRight}
                        ms="5px"
                        mt="2px"
                        h="16px"
                        w="16px"
                      />
                    </Button>
                  </Link>
                </MenuItem>
              </Flex>
            </MenuList>
          </Menu>

          <Link href="/diving/map" display={{ base: "none", lg: "block" }}>
            <Button
              variant="no-hover"
              border="1px solid"
              borderColor={textColor}
              color={textColor}
              fontSize="md"
              borderRadius="12px"
              bg="transparent"
              my="auto"
            >
              Start Exploring for Free
              <Icon as={MdChevronRight} ms="5px" mt="2px" h="16px" w="16px" />
            </Button>
          </Link>
        </Flex>
      </Flex>
      {secondary ? <Text color="white">{message}</Text> : null}
    </Box>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
