/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable sonarjs/no-duplicate-string */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  Icon,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaCircle } from "react-icons/fa";

import NavLink from "components/navLinks/NavLink";

export function SidebarLinks(props) {
  //   Chakra color mode
  const location = useRouter();
  const activeColor = useColorModeValue("brand.100", "brand.100");
  const inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  const activeIcon = useColorModeValue("brand.100", "brand.100");

  const { routes, hovered, mini } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  // this function creates the links and collapses that appear in the sidebar (left menu)
  const createLinks = (routes) => {
    return routes.map((route, key) => {
      if (route.collapse) {
        return (
          <Accordion allowToggle key={key}>
            <AccordionItem border="none" key={key}>
              <AccordionButton
                display="flex"
                align="center"
                justify="center"
                _hover={{
                  bg: "unset",
                }}
                _focus={{
                  boxShadow: "none",
                }}
                borderRadius="8px"
                w={{
                  sm: "100%",
                  xl: "100%",
                  "2xl": "95%",
                }}
                px={route.icon ? null : "0px"}
                py="0px"
                bg="transparent"
                ms={0}
              >
                {route.icon ? (
                  <Flex
                    align="center"
                    justifyContent={
                      mini === false || hovered === true
                        ? "space-between"
                        : "center"
                    }
                    // justifyContent={
                    //   mini === false
                    //     ? 'space-between'
                    //     : mini === true && hovered === true
                    //     ? 'space-between'
                    //     : 'center'
                    // }
                    w="100%"
                  >
                    <HStack
                      mb="6px"
                      spacing={
                        activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                      }
                    >
                      <Flex
                        w="100%"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Box
                          color={
                            activeRoute(route.path.toLowerCase())
                              ? activeIcon
                              : inactiveColor
                          }
                          me="12px"
                          mt="6px"
                        >
                          {route.icon}
                        </Box>
                        <Text
                          display={
                            mini === false || hovered === true
                              ? "block"
                              : "none"
                          }
                          me="auto"
                          color={
                            activeRoute(route.path.toLowerCase())
                              ? activeColor
                              : "secondaryGray.600"
                          }
                          fontWeight="500"
                          fontSize="md"
                        >
                          {route.name}
                        </Text>
                      </Flex>
                    </HStack>
                    <AccordionIcon
                      display={
                        mini === false || hovered === true ? "block" : "none"
                      }
                      ms="auto"
                      color="secondaryGray.600"
                      transform={route.icon ? null : "translateX(-70%)"}
                    />
                  </Flex>
                ) : (
                  <Flex
                    pt="0px"
                    pb="10px"
                    justify="center"
                    alignItems="center"
                    w="100%"
                  >
                    <HStack
                      spacing={
                        activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                      }
                      ps={mini === false || hovered === true ? "34px" : "0px"}
                    >
                      <Text
                        me="auto"
                        color={
                          activeRoute(route.path.toLowerCase())
                            ? activeColor
                            : inactiveColor
                        }
                        fontWeight="500"
                        fontSize="sm"
                      >
                        {mini === false || hovered === true ? route.name : ""}
                      </Text>
                    </HStack>
                    <AccordionIcon
                      display={
                        mini === false || hovered === true ? "block" : "none"
                      }
                      ms="auto"
                      color="secondaryGray.600"
                      transform={null}
                    />
                  </Flex>
                )}
              </AccordionButton>
              <AccordionPanel
                display={mini === false || hovered === true ? "block" : "flex"}
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                pe={route.icon ? "14px !important" : "0px"}
                py="0px"
                ps={route.icon ? "14px !important" : "8px"}
              >
                <List>
                  {
                    route.icon
                      ? createLinks(route.items) // for bullet accordion links
                      : createAccordionLinks(route.items) // for non-bullet accordion links
                  }
                </List>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        );
      }
      return (
        <NavLink to={route.layout + route.path} key={key}>
          {route.icon ? (
            <Flex
              align="center"
              justifyContent="space-between"
              w="100%"
              ps="17px"
              mb="0px"
            >
              <HStack
                mb="6px"
                spacing={
                  activeRoute(route.path.toLowerCase()) ? "22px" : "26px"
                }
              >
                <Flex w="100%" alignItems="center" justifyContent="center">
                  <Box
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeIcon
                        : inactiveColor
                    }
                    me="12px"
                    mt="6px"
                  >
                    {route.icon}
                  </Box>
                  <Text
                    me="auto"
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : "secondaryGray.600"
                    }
                    fontWeight="500"
                  >
                    {mini === false || hovered === true ? route.name : ""}
                  </Text>
                </Flex>
              </HStack>
            </Flex>
          ) : (
            <ListItem ms={null}>
              <Flex
                ps={mini === false || hovered === true ? "34px" : "0px"}
                alignItems="center"
                mb="8px"
              >
                <Text
                  color={
                    activeRoute(route.path.toLowerCase())
                      ? activeColor
                      : inactiveColor
                  }
                  fontWeight="500"
                  fontSize="sm"
                >
                  {mini === false || hovered === true ? route.name : ""}
                </Text>
              </Flex>
            </ListItem>
          )}
        </NavLink>
      );
    });
  };
  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createAccordionLinks = (routes) => {
    return routes.map((route, key) => {
      return (
        <NavLink to={route.layout + route.path} key={key}>
          <ListItem
            ms={mini === false || hovered === true ? "28px" : "0px"}
            display="flex"
            alignItems="center"
            mb="10px"
            key={key}
          >
            <Icon w="6px" h="6px" me="8px" as={FaCircle} color={activeIcon} />
            <Text
              color={
                activeRoute(route.path.toLowerCase())
                  ? activeColor
                  : inactiveColor
              }
              fontWeight={
                activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
              }
              fontSize="sm"
            >
              {mini === false || hovered === true ? route.name : ""}
            </Text>
          </ListItem>
        </NavLink>
      );
    });
  };
  //  BRAND
  return createLinks(routes);
}

export default SidebarLinks;
