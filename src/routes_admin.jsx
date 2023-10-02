/* eslint-disable import/no-cycle */
import { Icon } from "@chakra-ui/react";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuShip } from "react-icons/lu";
import { TbScubaMask, TbSettingsCog } from "react-icons/tb";

import DiveCentres from "pages/admin/dive_centres";
import DiveSites from "pages/admin/dive_sites";
import DiveTrips from "pages/admin/dive_trips";

const routes = [
  {
    name: "Super Admin",
    path: "/users",
    icon: (
      <Icon as={TbSettingsCog} width="20px" height="20px" color="purple.500" />
    ),
    collapse: true,
    items: [
      {
        name: "Dive Sites",
        layout: "",
        path: "/admin/dive_sites",
        component: DiveSites,
        icon: (
          <Icon
            as={TbScubaMask}
            width="20px"
            height="20px"
            color="purple.500"
          />
        ),
      },
      {
        name: "Dive Centres",
        layout: "",
        path: "/admin/dive_centres",
        component: DiveCentres,
        icon: (
          <Icon
            as={IoStorefrontOutline}
            width="20px"
            height="20px"
            color="purple.500"
          />
        ),
      },
      {
        name: "Dive Trips",
        layout: "",
        path: "/admin/dive_trips",
        component: DiveTrips,
        icon: (
          <Icon as={LuShip} width="20px" height="20px" color="purple.500" />
        ),
      },
    ],
  },
];

export default routes;
