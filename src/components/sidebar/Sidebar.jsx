/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
// chakra imports
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useRef } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
// Assers
import { IoMenuOutline } from "react-icons/io5";

import {
  renderThumb,
  renderTrack,
  renderView,
  renderViewMini,
} from "components/scrollbar/Scrollbar";

import Content from "./components/Content";

function Sidebar(props) {
  const { routes, adminRoutes, mini, hovered, setHovered } = props;

  // this is for the rest of the collapses
  const variantChange = "0.2s linear";
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  // Chakra Color Mode
  const sidebarBg = useColorModeValue("white", "navy.800");
  const sidebarRadius = "30px";
  const sidebarMargins = "0px";

  return (
    <Box
      display={{ sm: "none", xl: "block" }}
      position="fixed"
      minH="100%"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w={mini === false || hovered === true ? "285px" : "120px"}
        // w={
        //   mini === false
        //     ? "285px"
        //     : mini === true && hovered === true
        //     ? "285px"
        //     : "120px"
        // }
        ms={{
          sm: "16px",
        }}
        my={{
          sm: "16px",
        }}
        h="calc(100vh - 32px)"
        m={sidebarMargins}
        borderRadius={sidebarRadius}
        minH="100%"
        overflowX="hidden"
        boxShadow={shadow}
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={
            mini === false || hovered === true ? renderView : renderViewMini
          }
          // renderView={
          //   mini === false
          //     ? renderView
          //     : mini === true && hovered === true
          //     ? renderView
          //     : renderViewMini
          // }
        >
          <Content
            mini={mini}
            hovered={hovered}
            routes={routes}
            adminRoutes={adminRoutes}
          />
        </Scrollbars>
      </Box>
    </Box>
  );
}

// FUNCTIONS
export function SidebarResponsive(props) {
  const sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  const menuColor = useColorModeValue("gray.400", "white");
  // // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const { routes } = props;

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Flex ref={btnRef} w="max-content" h="max-content" onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my="auto"
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        // placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          w="285px"
          maxW="285px"
          ms={{
            sm: "16px",
          }}
          my={{
            sm: "16px",
          }}
          borderRadius="16px"
          bg={sidebarBackgroundColor}
        >
          <DrawerCloseButton
            zIndex="3"
            onClose={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="285px" px="0rem" pb="0">
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <Content mini={false} routes={routes} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
};

export default Sidebar;
