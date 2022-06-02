/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  // Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react";
// Custom Components
import PropTypes from "prop-types";
// import React from "react";
// Assets
// import navImage from "assets/img/layout/Navbar.png";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { IoLogOutOutline, IoWalletOutline } from "react-icons/io5";
import { MdInfoOutline } from "react-icons/md";
import { user, useMoralis } from "react-moralis";

import routes from "../../routes";
// import ItemContent from "../menu/ItemContent";
import { ProfileIcon } from "components/icons/Icons";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Balance from "components/navbar/Balance";
import SearchBar from "components/navbar/searchBar/SearchBar";
import { SidebarResponsive } from "components/sidebar/Sidebar";

function SignedOutMenuList() {
  const menuBg = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const { isAuthenticating, authenticate } = useMoralis();
  return (
    <Menu>
      <MenuButton p="0px">
        <Avatar
          _hover={{ cursor: "pointer" }}
          color="white"
          name="Adela Parkson"
          bg="#11047A"
          size="sm"
          w="40px"
          h="40px"
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
        <Flex w="100%" p="10px" mb="0px" borderBottom="1px solid gray">
          <MenuItem
            _hover={{ bg: "none" }}
            _focus={{ bg: "none" }}
            borderRadius="8px"
            px="14px"
          >
            <Button
              isLoading={isAuthenticating}
              onClick={() => authenticate()}
              variant="link"
              colorScheme="purple"
              size="sm"
              mr={4}
              leftIcon={<IoWalletOutline w="22px" h="22px" me="0px" ml="5" />}
            >
              Connect Wallet
            </Button>
          </MenuItem>
        </Flex>
        <Flex flexDirection="column" p="10px">
          <MenuItem
            _hover={{ bg: "none" }}
            _focus={{ bg: "none" }}
            borderRadius="8px"
            px="14px"
          >
            <Button
              isLoading={isAuthenticating}
              // onClick={() => navigate("/auth/signin")}
              variant="link"
              size="sm"
              color="teal"
              leftIcon={<ProfileIcon />}
            >
              Sign In
            </Button>
          </MenuItem>
          <MenuItem
            _hover={{ bg: "none" }}
            _focus={{ bg: "none" }}
            color="red.400"
            borderRadius="8px"
            px="14px"
          >
            <Button
              isLoading={isAuthenticating}
              // onClick={() => navigate("/auth/signup")}
              variant="link"
              size="sm"
              mt={1}
              mr={4}
              leftIcon={<IoWalletOutline />}
            >
              Sign Up
            </Button>
          </MenuItem>
        </Flex>
      </MenuList>
    </Menu>
  );
}

function SignedInMenuList() {
  const menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const navbarIcon = useColorModeValue("gray.400", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const { user, isAuthenticating, logout } = useMoralis();
  return (
    <Menu>
      <MenuButton p="0px">
        <Avatar
          _hover={{ cursor: "pointer" }}
          color="white"
          name={user.attributes.username}
          src={user.attributes?.avatar?._url}
          bg="#11047A"
          size="sm"
          w="40px"
          h="40px"
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
        <Flex w="100%" mb="0px">
          <Text
            ps="20px"
            pt="16px"
            pb="10px"
            w="100%"
            pr="15px"
            borderBottom="1px solid"
            borderColor={borderColor}
            fontSize="sm"
            fontWeight="700"
            color={textColor}
          >
            {user.attributes.accounts[0].substring(0, 7)} {` ...... `}
            {user.attributes.accounts[0].slice(-7)}
          </Text>
        </Flex>
        <Flex flexDirection="column" p="10px">
          <MenuItem
            _hover={{ bg: "none" }}
            _focus={{ bg: "none" }}
            borderRadius="8px"
            px="14px"
          >
            <Button
              // onClick={() => navigate("/admin/edit_profile")}
              variant="link"
              size="sm"
              mr={4}
              leftIcon={<ProfileIcon />}
            >
              Profile
            </Button>
          </MenuItem>
          <MenuItem
            _hover={{ bg: "none" }}
            _focus={{ bg: "none" }}
            color="red.400"
            borderRadius="8px"
            px="14px"
          >
            <Button
              isLoading={isAuthenticating}
              onClick={() => logout()}
              variant="link"
              colorScheme="red"
              size="sm"
              mr={4}
              leftIcon={
                <IoLogOutOutline
                  color={navbarIcon}
                  w="22px"
                  h="22px"
                  me="0px"
                  ml="5"
                />
              }
            >
              Log Out
            </Button>
          </MenuItem>
        </Flex>
      </MenuList>
    </Menu>
  );
}

export default function HeaderLinks(props) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    isAuthenticated,
    Moralis,
    // logout,
    user,
    // isAuthUndefined,
    // isAuthenticating,
    // authenticate,
  } = useMoralis();
  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");
  const menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const ethColor = useColorModeValue("gray.700", "white");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const borderButton = useColorModeValue("secondaryGray.500", "whiteAlpha.200");

  const getFiat = async function () {
    Moralis.initPlugins();
    await Moralis.Plugins.fiat.buy(
      {},
      {
        disableTriggers: true,
      }
    );
  };

  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p="10px"
      borderRadius="30px"
      boxShadow={shadow}
    >
      <SearchBar
        mb={secondary ? { base: "10px", md: "unset" } : "unset"}
        me="10px"
        borderRadius="30px"
      />
      <Flex
        bg={ethBg}
        display={secondary ? "flex" : "none"}
        borderRadius="30px"
        p="6px"
        align="center"
        me="6px"
        ms="auto"
      >
        <Flex
          align="center"
          justify="center"
          bg={ethBox}
          h="29px"
          w="29px"
          borderRadius="30px"
          me="7px"
        >
          <Icon color={ethColor} w="9px" h="14px" as={FaEthereum} />
        </Flex>
        <Balance user={user} />
      </Flex>
      <SidebarResponsive routes={routes} />
      <Menu>
        <Tooltip label="Buy Crypto">
          <MenuButton display="flex" alignItems="center" p="0px">
            <Icon
              mt="6px"
              as={FaBitcoin}
              color={navbarIcon}
              w="18px"
              h="18px"
              me="10px"
              onClick={() => getFiat()}
            />
          </MenuButton>
        </Tooltip>
      </Menu>

      <Menu>
        <MenuButton p="0px">
          <Icon
            as={MdInfoOutline}
            color={navbarIcon}
            w="18px"
            h="18px"
            me="10px"
            mt="6px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="20px"
          me={{ base: "30px", md: "unset" }}
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          minW={{ base: "unset" }}
          maxW={{ base: "360px", md: "unset" }}
        >
          {/* <Image src={navImage} borderRadius='16px' mb='28px' /> */}
          <Flex flexDirection="column">
            <Link w="100%" href="https://horizon-ui.com/pro">
              <Button w="100%" h="44px" mb="10px" variant="brand">
                Buy Horizon UI PRO
              </Button>
            </Link>
            <Link
              w="100%"
              href="https://horizon-ui.com/documentation/docs/introduction"
            >
              <Button
                w="100%"
                h="44px"
                mb="10px"
                border="1px solid"
                bg="transparent"
                borderColor={borderButton}
              >
                See Documentation
              </Button>
            </Link>
            <Link
              w="100%"
              href="https://github.com/horizon-ui/horizon-ui-chakra"
            >
              <Button
                w="100%"
                h="44px"
                variant="no-hover"
                color={textColor}
                bg="transparent"
              >
                Try Horizon Free
              </Button>
            </Link>
          </Flex>
        </MenuList>
      </Menu>

      <Tooltip
        label={`${
          colorMode === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"
        }`}
      >
        <Button
          variant="no-hover"
          bg="transparent"
          p="0px"
          minW="unset"
          minH="unset"
          h="18px"
          w="max-content"
          onClick={toggleColorMode}
        >
          <Icon
            me="10px"
            h="18px"
            w="18px"
            color={navbarIcon}
            as={colorMode === "light" ? IoMdMoon : IoMdSunny}
          />
        </Button>
      </Tooltip>
      {!isAuthenticated ? <SignedOutMenuList /> : <SignedInMenuList />}
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
