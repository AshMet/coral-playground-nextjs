import { Icon } from "@chakra-ui/react";
import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbCalendar, TbReportMoney, TbUser } from "react-icons/tb";

// import DiveCentre from "pages/business/manage";
// import DiveTrip from "pages/business/manage_trips";
// import User from "pages/users/me";

const routes = [
  {
    name: "Business Admin",
    path: "/users" || "/business",
    icon: (
      <Icon
        as={MdOutlineAdminPanelSettings}
        width="20px"
        height="20px"
        color="yellow.500"
      />
    ),
    collapse: true,
    items: [
      {
        name: "Profile",
        layout: "",
        path: "/users/me",
        // component: User,
        icon: (
          <Icon as={TbUser} width="20px" height="20px" color="yellow.500" />
        ),
      },
      {
        name: "Manage Business",
        layout: "",
        path: "/business/manage",
        // component: DiveCentre,
        icon: (
          <Icon
            as={IoStorefrontOutline}
            width="20px"
            height="20px"
            color="yellow.500"
          />
        ),
      },
      {
        name: "Manage Trips",
        layout: "",
        path: "/business/manage_trips",
        // component: DiveTrip,
        icon: (
          <Icon as={TbCalendar} width="20px" height="20px" color="yellow.500" />
        ),
      },
      {
        name: "Orders",
        layout: "",
        path: "/business/orders",
        // component: DiveTrip,
        icon: (
          <Icon
            as={TbReportMoney}
            width="20px"
            height="20px"
            color="yellow.500"
          />
        ),
      },
    ],
  },
];

export default routes;
