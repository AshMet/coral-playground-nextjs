/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import { Icon, ListItem, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaCircle } from "react-icons/fa";
import { MdHome } from "react-icons/md";

import NavLink from "components/navLinks/NavLink";
import DiveCentres from "pages/diving/dive_centres";

const adminRoutes = [
  {
    name: "Admin",
    path: "/diving",
    icon: <Icon as={MdHome} width="15px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      {
        name: "Home",
        layout: "",
        path: "/",
        component: DiveCentres,
        icon: <Icon as={MdHome} width="15px" height="20px" color="inherit" />,
      },
    ],
  },
];

export default function AdminLinks() {
  const location = useRouter();
  const activeColor = useColorModeValue("brand.100", "brand.100");
  const inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  const activeIcon = useColorModeValue("brand.100", "brand.100");
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  return adminRoutes.map((route, key) => {
    return (
      <NavLink to={route.layout + route.path} key={key}>
        <ListItem
          ms="28px"
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
            {route.name}
          </Text>
        </ListItem>
      </NavLink>
    );
  });
}
