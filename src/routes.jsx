/* eslint-disable import/no-cycle */
import { Icon, Badge } from "@chakra-ui/react";
// import React from "react";
import {
  // MdDashboard,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import DashboardsCarInterface from "pages/admin/dashboards/carInterface";
import DashboardsDefault from "pages/admin/dashboards/default";
import DashboardsSmartHome from "pages/admin/dashboards/smartHome";
// NFT Imports
import NFTCollection from "pages/admin/nfts/collection";
import NFTDrops from "pages/admin/nfts/drops";
import NFTMarketplace from "pages/admin/nfts/marketplace";
import NFTPage from "pages/admin/nfts/page";
import NFTProfile from "pages/admin/nfts/profile";
// Main Imports
// import AccountBilling from "pages/admin/main/account/billing";
// import AccountApplications from "pages/admin/main/account/application";
// import AccountInvoice from "pages/admin/main/account/invoice";
// import AccountSettings from "pages/admin/main/account/settings";
// import AccountAllCourses from "pages/admin/main/account/courses";
// import AccountCoursePage from "pages/admin/main/account/coursePage";
// import UserNew from "pages/admin/main/users/newUser";
// import UsersOverview from "pages/admin/main/users/overview";
// import UsersReports from "pages/admin/main/users/reports";
// import ProfileSettings from "pages/admin/main/profile/settings";
// import ProfileOverview from "pages/admin/main/profile/overview";
// import ProfileNewsfeed from "pages/admin/main/profile/newsfeed";
// import ApplicationsKanban from "pages/admin/main/applications/kanban";
// import ApplicationsDataTables from "pages/admin/main/applications/dataTables";
// import ApplicationsCalendar from "pages/admin/main/applications/calendar";
// import EcommerceNewProduct from "pages/admin/main/ecommerce/newProduct";
// import EcommerceProductSettings from "pages/admin/main/ecommerce/settingsProduct";
// import EcommerceProductPage from "pages/admin/main/ecommerce/pageProduct";
// import EcommerceOrderList from "pages/admin/main/ecommerce/orderList";
// import EcommerceOrderDetails from "pages/admin/main/ecommerce/orderDetails";
// import EcommerceReferrals from "pages/admin/main/ecommerce/referrals";
// import OthersNotifications from "pages/admin/main/others/notifications";
// import OthersPricing from "pages/admin/main/others/pricing";
// Auth Imports
// import ForgotPasswordCentered from "pages/auth/forgotPassword/ForgotPasswordCentered.jsx";
// import ForgotPasswordDefault from "pages/auth/forgotPassword/ForgotPasswordDefault.jsx";
// import LockCentered from "pages/auth/lock/LockCentered.jsx";
// import LockDefault from "pages/auth/lock/LockDefault.jsx";
// import SignInCentered from "pages/auth/signIn/SignInCentered";
// import SignInDefault from "pages/auth/signIn/SignInDefault";
// import SignUpCentered from "pages/auth/signUp/SignUpCentered";
// import SignUpDefault from "pages/auth/signUp/SignUpDefault";
// import VerificationCentered from "pages/auth/verification/VerificationCentered";
// import VerificationDefault from "pages/auth/verification/VerificationDefault";

const routes = [
  // --- Getting Started ---
  {
    name: "Get Started",
    path: "/auth",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      {
        name: "Home",
        layout: "/auth",
        path: "/home",
      },
      // --- Sign In ---
      {
        name: "Sign In",
        path: "/sign-in",
        collapse: true,
        items: [
          // {
          //   name: "Default",
          //   layout: "/auth",
          //   path: "/sign-in/default",
          //   icon: (
          //     <Icon as={MdHome} width="16px" height="16px" color="inherit" />
          //   ),
          //   component: SignInDefault,
          // },
          {
            name: "Centered",
            layout: "/auth",
            path: "/signIn/SignInCentered",
            icon: (
              <Icon as={MdHome} width="16px" height="16px" color="inherit" />
            ),
            // component: SignInCentered,
          },
        ],
      },
      // --- Sign Up ---
      {
        name: "Sign Up",
        path: "/sign-up",
        collapse: true,
        items: [
          // {
          //   name: "Default",
          //   layout: "/auth",
          //   path: "/sign-up/default",
          //   icon: (
          //     <Icon as={MdHome} width="16px" height="16px" color="inherit" />
          //   ),
          //   component: SignUpDefault,
          // },
          {
            name: "Centered",
            layout: "/auth",
            path: "/signUp/SignUpCentered",
            icon: (
              <Icon as={MdHome} width="16px" height="16px" color="inherit" />
            ),
            // component: SignUpCentered,
          },
        ],
      },
      // --- Verification ---
      // {
      //   name: "Verification",
      //   path: "/verification",
      //   collapse: true,
      //   items: [
      //     {
      //       name: "Default",
      //       layout: "/auth",
      //       path: "/verification/default",
      //       icon: (
      //         <Icon as={MdHome} width="16px" height="16px" color="inherit" />
      //       ),
      //       component: VerificationDefault,
      //     },
      //     {
      //       name: "Centered",
      //       layout: "/auth",
      //       path: "/verification/centered",
      //       icon: (
      //         <Icon as={MdHome} width="16px" height="16px" color="inherit" />
      //       ),
      //       component: VerificationCentered,
      //     },
      //   ],
      // },
      //     // --- Lock ---
      //     {
      //       name: "Lock",
      //       path: "/lock",
      //       collapse: true,
      //       items: [
      //         {
      //           name: "Default",
      //           layout: "/auth",
      //           path: "/lock/default",
      //           icon: (
      //             <Icon as={MdHome} width='16px' height='16px' color='inherit' />
      //           ),
      //           component: LockDefault,
      //         },
      //         {
      //           name: "Centered",
      //           layout: "/auth",
      //           path: "/lock/centered",
      //           icon: (
      //             <Icon as={MdHome} width='16px' height='16px' color='inherit' />
      //           ),
      //           component: LockCentered,
      //         },
      //       ],
      //     },
      //     // --- Forgot Password ---
      //     {
      //       name: "Forgot Password",
      //       path: "/forgot-password",
      //       collapse: true,
      //       items: [
      //         {
      //           name: "Default",
      //           layout: "/auth",
      //           path: "/forgot-password/default",
      //           icon: (
      //             <Icon as={MdHome} width='16px' height='16px' color='inherit' />
      //           ),
      //           component: ForgotPasswordDefault,
      //         },
      //         {
      //           name: "Centered",
      //           layout: "/auth",
      //           path: "/forgot-password/centered",
      //           icon: (
      //             <Icon as={MdHome} width='16px' height='16px' color='inherit' />
      //           ),
      //           component: ForgotPasswordCentered,
      //         },
      //       ],
      //     },
    ],
  },
  // --- Dashboards ---
  {
    name: "Activities",
    path: "/dashboards",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    collapse: true,
    items: [
      {
        name: "Learn",
        layout: "/admin",
        path: "/dashboards/default",
        component: DashboardsDefault,
      },
      {
        name: "Explore",
        layout: "/admin",
        path: "/dashboards/carInterface",
        component: DashboardsCarInterface,
      },
      {
        name: "Smart Home",
        layout: "/admin",
        path: "/dashboards/smartHome",
        component: DashboardsSmartHome,
      },
    ],
  },
  // --- NFTs ---
  {
    name: "NFTs",
    path: "/nfts",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    collapse: true,
    items: [
      {
        name: "Marketplace",
        layout: "",
        path: "/nfts/marketplace",
        component: NFTMarketplace,
        secondary: true,
      },
      {
        name: "Collection",
        layout: "/admin",
        path: "/nfts/collection",
        component: NFTCollection,
        secondary: true,
      },
      {
        name: "NFT Page",
        layout: "/admin",
        path: "/nfts/page",
        component: NFTPage,
        secondary: true,
      },
      {
        name: "Profile",
        layout: "/admin",
        path: "/nfts/profile",
        component: NFTProfile,
        secondary: true,
      },
      {
        name: "Drops",
        layout: "/admin",
        path: "/nfts/drops",
        component: NFTDrops,
        secondary: true,
      },
    ],
  },
  // --- Main pages ---
  // {
  //   name: "Main Pages",
  //   path: "/main",
  //   icon: <Icon as={MdDashboard} width="20px" height="20px" color="inherit" />,
  //   collapse: true,
  //   items: [
  //     {
  //       name: "Account",
  //       path: "/main/account",
  //       collapse: true,
  //       items: [
  //         {
  //           name: "Billing",
  //           layout: "/admin",
  //           path: "/main/account/billing",
  //           exact: false,
  //           component: AccountBilling,
  //         },
  // {
  //   name: "Application",
  //   layout: "/admin",
  //   path: "/main/account/application",
  //   exact: false,
  //   component: AccountApplications,
  // },
  // {
  //   name: "Invoice",
  //   layout: "/admin",
  //   path: "/main/account/invoice",
  //   exact: false,
  //   component: AccountInvoice,
  // },
  // {
  //   name: "Settings",
  //   layout: "/admin",
  //   path: "/main/account/settings",
  //   exact: false,
  //   component: AccountSettings,
  // },
  // {
  //   name: "All Courses",
  //   layout: "/admin",
  //   path: "/main/account/all-courses",
  //   exact: false,
  //   component: AccountAllCourses,
  // },
  // {
  //   name: "Course Page",
  //   layout: "/admin",
  //   path: "/main/account/course-page",
  //   exact: false,
  //   component: AccountCoursePage,
  // },
  //   ],
  // },
  // {
  //   name: "Ecommerce",
  //   path: "/main/users",
  //   collapse: true,
  //   items: [
  //     {
  //       name: "New Product",
  //       layout: "/admin",
  //       path: "/main/ecommerce/new-prodcut",
  //       exact: false,
  //       component: EcommerceNewProduct,
  //     },
  //     {
  //       name: "Product Settings",
  //       layout: "/admin",
  //       path: "/main/ecommerce/settings",
  //       exact: false,
  //       component: EcommerceProductSettings,
  //     },
  //     {
  //       name: "Product Page",
  //       layout: "/admin",
  //       path: "/main/ecommerce/page-example",
  //       exact: false,
  //       component: EcommerceProductPage,
  //     },
  //     {
  //       name: "Order List",
  //       layout: "/admin",
  //       path: "/main/ecommerce/order-list",
  //       exact: false,
  //       component: EcommerceOrderList,
  //     },
  //     {
  //       name: "Order Details",
  //       layout: "/admin",
  //       path: "/main/ecommerce/order-details",
  //       exact: false,
  //       component: EcommerceOrderDetails,
  //     },
  //     {
  //       name: "Referrals",
  //       layout: "/admin",
  //       path: "/main/ecommerce/referrals",
  //       exact: false,
  //       component: EcommerceReferrals,
  //     },
  //   ],
  // },
  // {
  //   name: "Users",
  //   path: "/main/users",
  //   collapse: true,
  //   items: [
  //     {
  //       name: "New User",
  //       layout: "/admin",
  //       path: "/main/users/new-user",
  //       exact: false,
  //       component: UserNew,
  //     },
  //     {
  //       name: "Users Overview",
  //       layout: "/admin",
  //       path: "/main/users/users-overview",
  //       exact: false,
  //       component: UsersOverview,
  //     },
  //     {
  //       name: "Users Reports",
  //       layout: "/admin",
  //       path: "/main/users/users-reports",
  //       exact: false,
  //       component: UsersReports,
  //     },
  //   ],
  // },
  // {
  //   name: "Applications",
  //   path: "/main/applications",
  //   collapse: true,
  //   items: [
  //     {
  //       name: "Kanban",
  //       layout: "/admin",
  //       path: "/main/applications/kanban",
  //       exact: false,
  //       component: ApplicationsKanban,
  //     },
  //     {
  //       name: "Data Tables",
  //       layout: "/admin",
  //       path: "/main/applications/data-tables",
  //       exact: false,
  //       component: ApplicationsDataTables,
  //     },
  //     {
  //       name: "Calendar",
  //       layout: "/admin",
  //       path: "/main/applications/calendar",
  //       exact: false,
  //       component: ApplicationsCalendar,
  //     },
  //   ],
  // },
  // {
  //   name: "Profile",
  //   path: "/main/profile",
  //   collapse: true,
  //   items: [
  //     {
  //       name: "Profile Overview",
  //       layout: "/admin",
  //       path: "/main/profile/overview",
  //       exact: false,
  //       component: ProfileOverview,
  //     },
  //     {
  //       name: "Profile Settings",
  //       layout: "/admin",
  //       path: "/main/profile/settings",
  //       exact: false,
  //       component: ProfileSettings,
  //     },
  //     {
  //       name: "News Feed",
  //       layout: "/admin",
  //       path: "/main/profile/newsfeed",
  //       exact: false,
  //       component: ProfileNewsfeed,
  //     },
  //   ],
  // },
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
