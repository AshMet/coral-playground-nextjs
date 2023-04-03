/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable import/no-cycle */
import { Flex, Icon, useColorModeValue, Box } from "@chakra-ui/react";
// Custom Components
import PropTypes from "prop-types";
import { FaEthereum } from "react-icons/fa";

// import ItemContent from "../menu/ItemContent";
import AvatarMenuItem from "../icons/AvatarMenuItem";
import DarkModeMenuItem from "../icons/DarkModeMenuItem";
import ShoppingCart from "../icons/ShoppingCart";
// import Balance from "components/navbar/Balance";
import SearchBar from "components/navbar/searchBar/SearchBar";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import routes from "routes";

export default function NavbarDivingLinks(props) {
  const { secondary } = props;
  const menuBg = useColorModeValue("white", "navy.800");
  // const textColor = useColorModeValue("secondaryGray.900", "white");
  const ethColor = useColorModeValue("gray.700", "white");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  // const borderButton = useColorModeValue("secondaryGray.500", "whiteAlpha.200");

  // const getFiat = async function () {
  //   Moralis.initPlugins();
  //   await Moralis.Plugins.fiat.buy(
  //     {},
  //     {
  //       disableTriggers: true,
  //     }
  //   );
  // };

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
        {/* <Balance user={user} /> */}
      </Flex>
      <SidebarResponsive routes={routes} />
      {/* <Menu>
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
      </Menu> */}

      {/* <Menu>
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
          <Image src={navImage} borderRadius='16px' mb='28px' />
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
      </Menu> */}

      <Box>
        <ShoppingCart />
      </Box>
      <Box me="10px">
        <DarkModeMenuItem />
      </Box>
      <Box me="10px">
        <AvatarMenuItem />
      </Box>
    </Flex>
  );
}

NavbarDivingLinks.propTypes = {
  // variant: PropTypes.string,
  // fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  // onOpen: PropTypes.func,
};
