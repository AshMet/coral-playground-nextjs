/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/prop-types */
// Chakra imports
import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
// import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";

import routes from "../routes";
import Footer from "components/footer/FooterDiving";
// Layout components
import NavbarDiving from "components/navbar/NavbarDiving";
import Sidebar from "components/sidebar/Sidebar";
import { CartProvider } from "contexts/CartContext";
import SidebarContext from "contexts/SidebarContext";

// import { Redirect, Route, Switch } from "react-router-dom";
// import "mapbox-gl/dist/mapbox-gl.css";

// Custom Chakra theme
export default function DivingLayout({ children, ...props }) {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [mini, setMini] = useState(true);
  const [hovered, setHovered] = useState(false);
  const user = useUser();
  // const posthog = usePostHog();

  // useEffect(() => {
  //   if (user) {
  //     posthog?.identify(
  //       user.email, // distinctId
  //       {
  //         role: user?.user_metadata.role,
  //         first_name: user?.user_metadata.first_name,
  //         last_name: user?.user_metadata.last_name,
  //       }
  //     );
  //   }
  // }, [posthog, user]);
  // functions for changing the states from components
  const getRoute = () => {
    return (
      typeof window !== "undefined" &&
      window.location.pathname !== "/admin/full-screen-maps"
    );
  };
  const getActiveRoute = (routes) => {
    const activeRoute = "";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveRoute = getActiveRoute(routes[i].items);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        const categoryActiveRoute = getActiveRoute(routes[i].items);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else if (
        typeof window !== "undefined" &&
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    const activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveNavbar = getActiveNavbar(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        const categoryActiveNavbar = getActiveNavbar(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else if (
        typeof window !== "undefined" &&
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };
  const getActiveNavbarText = (routes) => {
    const activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        const collapseActiveNavbar = getActiveNavbarText(routes[i].items);
        if (collapseActiveNavbar !== activeNavbar) {
          return collapseActiveNavbar;
        }
      } else if (routes[i].category) {
        const categoryActiveNavbar = getActiveNavbarText(routes[i].items);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else if (
        typeof window !== "undefined" &&
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].messageNavbar;
      }
    }
    return activeNavbar;
  };

  // console.log(routes.filter((route) => route.invisible === true));
  // const sidebarLinks = (routes) => {
  //   return [...routes].filter((route) => route.invisible === true);
  // };

  // const getRoutes = (routes) => {
  //   return routes.map((prop, key) => {
  //     if (prop.layout === "/admin") {
  //       return (
  //         <Route
  //           path={prop.layout + prop.path}
  //           component={prop.component}
  //           key={key}
  //         />
  //       );
  //     }
  //     if (prop.collapse) {
  //       return getRoutes(prop.items);
  //     }
  //     if (prop.category) {
  //       return getRoutes(prop.items);
  //     }
  //     return null;
  //   });
  // };

  const { onOpen } = useDisclosure();
  return (
    <Box>
      <CartProvider>
        <SidebarContext.Provider
          value={{
            toggleSidebar,
            setToggleSidebar,
          }}
        >
          <Sidebar
            hovered={hovered}
            setHovered={setHovered}
            mini={mini}
            routes={routes}
            display="none"
            {...rest}
          />
          <Box
            float="right"
            minHeight="100vh"
            height="100%"
            overflow="auto"
            position="relative"
            maxHeight="100%"
            w={
              mini === false || hovered === true
                ? { base: "100%", xl: "calc( 100% - 290px )" }
                : { base: "100%", xl: "calc( 100% - 120px )" }
            }
            maxWidth={
              mini === false || hovered === true
                ? { base: "100%", xl: "calc( 100% - 290px )" }
                : { base: "100%", xl: "calc( 100% - 120px )" }
            }
            transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
            transitionDuration=".2s, .2s, .35s"
            transitionProperty="top, bottom, width"
            transitionTimingFunction="linear, linear, ease"
          >
            <Portal>
              <Box>
                <NavbarDiving
                  hovered={hovered}
                  setMini={setMini}
                  mini={mini}
                  onOpen={onOpen}
                  logoText="Coral Playground"
                  brandText={getActiveRoute(routes)}
                  secondary={getActiveNavbar(routes)}
                  // theme={props.theme}
                  // setTheme={props.setTheme}
                  message={getActiveNavbarText(routes)}
                  fixed={fixed}
                  {...rest}
                />
              </Box>
            </Portal>

            {/* {getRoute() ? ( */}
            <Box
              mx="auto"
              p={{ base: "20px", md: "30px" }}
              pe="20px"
              minH="100vh"
              mt="100px"
            >
              {/* <Switch>
                {getRoutes(routes)}
                <Redirect from='/' to='/admin/dashboards/default' />
              </Switch> */}
              {children}
            </Box>
            {/* ) : null} */}
            <Box>
              <Footer />
            </Box>
          </Box>
        </SidebarContext.Provider>
      </CartProvider>
    </Box>
  );
}
