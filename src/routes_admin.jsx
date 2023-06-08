/* eslint-disable import/no-cycle */
import { Icon } from "@chakra-ui/react";
import { IoStorefrontOutline } from "react-icons/io5";
import { TbCalendar, TbUser } from "react-icons/tb";

import DiveCentre from "pages/business/manage";
import User from "pages/users/me";

const routes = [
  {
    name: "Business Admin",
    path: "/users" || "/business/manage",
    icon: (
      <Icon
        as={IoStorefrontOutline}
        width="15px"
        height="20px"
        color="inherit"
      />
    ),
    collapse: true,
    items: [
      {
        name: "Profile",
        layout: "",
        path: "/users/me",
        component: User,
        icon: <Icon as={TbUser} width="15px" height="20px" color="inherit" />,
      },
      {
        name: "Manage Dive Centre",
        layout: "",
        path: "/business/manage",
        component: DiveCentre,
        icon: (
          <Icon as={TbCalendar} width="15px" height="20px" color="inherit" />
        ),
      },
    ],
  },
];

export default routes;
