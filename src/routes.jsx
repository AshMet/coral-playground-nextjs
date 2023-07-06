/* eslint-disable import/no-cycle */
import { Icon } from "@chakra-ui/react";
import { IoStorefrontOutline } from "react-icons/io5";
import { TbCertificate, TbMapPin, TbScubaMask } from "react-icons/tb";

import Certifications from "pages/certifications";
import DiveCentres from "pages/dive_centres";
import DiveSites from "pages/dive_sites";
import DiveMap from "pages/map";

const routes = [
  // {
  //   name: "Home",
  //   path: "https://www.coralplayground.com",
  //   icon: <Icon as={TbScubaMask} width="15px" height="20px" color="inherit" />,
  //   collapse: false,
  // },
  {
    name: "Map",
    layout: "",
    path: "/map",
    component: DiveMap,
    icon: <Icon as={TbMapPin} width="15px" height="20px" color="inherit" />,
    collapse: false,
  },
  {
    name: "Certifications",
    layout: "",
    path: "/certifications",
    component: Certifications,
    icon: (
      <Icon as={TbCertificate} width="15px" height="20px" color="inherit" />
    ),
  },
  {
    name: "Dive Sites",
    layout: "",
    path: "/dive_sites",
    component: DiveSites,
    icon: <Icon as={TbScubaMask} width="15px" height="20px" color="inherit" />,
  },
  {
    name: "Dive Centres",
    layout: "",
    path: "/dive_centres",
    component: DiveCentres,
    icon: (
      <Icon
        as={IoStorefrontOutline}
        width="15px"
        height="20px"
        color="inherit"
      />
    ),
  },
  // {
  //   name: "Others",
  //   path: "/main/others",
  //   collapse: true,
  //   items: [
  //     {
  //       name: "Notifications",
  //       layout: "/admin",
  //       path: "/main/others/notifications",
  //       exact: false,
  //       component: OthersNotifications,
  //     },
  //     {
  //       name: "Pricing",
  //       layout: "/auth",
  //       path: "/main/others/pricing",
  //       exact: false,
  //       component: OthersPricing,
  //     },
  //   ],
  // },
  //   ],
  // },
];

export default routes;
