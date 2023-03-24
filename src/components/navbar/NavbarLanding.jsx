/* eslint-disable no-undef */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-use-before-define */
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
  Tooltip,
} from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoLogoInstagram, IoMenuOutline } from "react-icons/io5";
import { MdChevronRight } from "react-icons/md";

import { VSeparator } from "components/separator/Separator";
// import * as gtag from "lib/data/gtag";

export default function LandingNavbar(props) {
  const user = useUser();
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
  const hoverColor = "brand.100";
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
        <Link href={user ? "/users/me" : "/"}>
          <Image src="/svg/coral-logo.svg" width="200px" height="45px" />
        </Link>
        <Flex ms="auto">
          <Link
            display={{ base: "none", lg: "block" }}
            href="/diving/map"
            color={textColor}
            fontSize="md"
            fontWeight="600"
            me="30px"
            my="auto"
            _hover={{ color: hoverColor, cursor: "pointer" }}
          >
            Map
          </Link>
          <Link
            display={{ base: "none", lg: "block" }}
            href="/diving/certifications"
            color={textColor}
            fontSize="md"
            fontWeight="600"
            me="30px"
            my="auto"
            _hover={{ color: hoverColor, cursor: "pointer" }}
          >
            Certifications
          </Link>
          <Link
            display={{ base: "none", lg: "block" }}
            href="/diving/dive_sites"
            color={textColor}
            fontSize="md"
            fontWeight="600"
            me="30px"
            my="auto"
            _hover={{ color: hoverColor, cursor: "pointer" }}
          >
            Dive Sites
          </Link>
          <Link
            display={{ base: "none", lg: "block" }}
            href="/diving/dive_centres"
            color={textColor}
            fontSize="md"
            fontWeight="600"
            me="30px"
            my="auto"
            _hover={{ color: hoverColor, cursor: "pointer" }}
          >
            Dive Centres
          </Link>
          <VSeparator
            me="14px"
            bg={textColor}
            display={{ base: "none", lg: "block" }}
          />
          {user ? (
            <Tooltip label="Profile">
              <Link my="auto" href="/users/me">
                <Button
                  variant="no-hover"
                  h="max-content"
                  w="max-content"
                  bg="transparent"
                  my="auto"
                >
                  <Icon
                    as={HiOutlineUserCircle}
                    color={textColor}
                    w="22px"
                    h="22px"
                  />
                </Button>
              </Link>
            </Tooltip>
          ) : (
            <Tooltip label="Sign Up / Login">
              <Link my="auto" href="/auth/login">
                <Button
                  variant="no-hover"
                  h="max-content"
                  w="max-content"
                  bg="transparent"
                  my="auto"
                >
                  <Icon
                    as={HiOutlineUserCircle}
                    color={textColor}
                    w="22px"
                    h="22px"
                  />
                </Button>
              </Link>
            </Tooltip>
          )}
          <Tooltip label="Follow us on Instagram">
            <Link
              me="10px"
              my="auto"
              href="https://instagram.com/coralplayground/"
            >
              <Button
                variant="no-hover"
                h="max-content"
                w="max-content"
                bg="transparent"
                my="auto"
                // onClick={gtag.event({
                //   action: "follow-instagram",
                //   category: "button",
                //   label: "Follow us on Instagram",
                //   // value: ,
                // })}
              >
                <Icon
                  as={IoLogoInstagram}
                  color={textColor}
                  w="18px"
                  h="18px"
                />
              </Button>
            </Link>
          </Tooltip>
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
                    href="/diving/map"
                    color={menuTextColor}
                    fontSize="md"
                    fontWeight="500"
                    me="30px"
                    my="auto"
                    _hover={{ color: hoverColor, cursor: "pointer" }}
                  >
                    Map
                  </Link>
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "none" }}
                  _focus={{ bg: "none" }}
                  borderRadius="8px"
                  px="14px"
                >
                  <Link
                    href="/diving/certifications"
                    color={menuTextColor}
                    fontSize="md"
                    fontWeight="500"
                    me="30px"
                    my="auto"
                    _hover={{ color: hoverColor, cursor: "pointer" }}
                  >
                    Certifications
                  </Link>
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "none" }}
                  _focus={{ bg: "none" }}
                  borderRadius="8px"
                  px="14px"
                >
                  <Link
                    href="/diving/dive_sites"
                    color={menuTextColor}
                    fontSize="md"
                    fontWeight="500"
                    me="30px"
                    my="auto"
                    _hover={{ color: hoverColor, cursor: "pointer" }}
                  >
                    Dive Sites
                  </Link>
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "none" }}
                  _focus={{ bg: "none" }}
                  borderRadius="8px"
                  px="14px"
                >
                  <Link
                    href="/diving/dive_centres"
                    color={menuTextColor}
                    fontSize="md"
                    fontWeight="500"
                    me="30px"
                    my="auto"
                    _hover={{ color: hoverColor, cursor: "pointer" }}
                  >
                    Dive Centres
                  </Link>
                </MenuItem>
                <MenuItem
                  _hover={{ bg: "none", cursor: "pointer" }}
                  _focus={{ bg: "none" }}
                  borderRadius="8px"
                >
                  <Link href="/dive_centres/home">
                    <Button
                      variant="outline"
                      border="1px solid"
                      borderColor={menuTextColor}
                      color={menuTextColor}
                      fontSize="md"
                      borderRadius="12px"
                      my="auto"
                      _hover={{ bg: "brand.100", cursor: "pointer" }}
                    >
                      Become a Business Partner
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

          <Link
            href="/dive_centres/home"
            display={{ base: "none", lg: "block" }}
          >
            <Button
              variant="outline"
              border="1px solid"
              borderColor={textColor}
              color={textColor}
              fontSize="md"
              borderRadius="12px"
              // bg="transparent"
              my="auto"
              _hover={{ bg: "brand.100", cursor: "pointer" }}
            >
              Become a Business Partner
              <Icon as={MdChevronRight} ms="5px" mt="2px" h="16px" w="16px" />
            </Button>
          </Link>
        </Flex>
      </Flex>
      {secondary ? <Text color="white">{message}</Text> : null}
    </Box>
  );
}

LandingNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
